import { db } from '@/components/lib/db';
import type { Todo } from '@/components/lib/types';
import { Button } from '@/components/ui/button';
import { Temporal } from 'temporal-polyfill';
import { Link } from 'wouter';
import { STATUSES } from '../constants';
import { CategoryForm } from './CategoryForm';
import { TodoForm } from './TodoForm';

export const DueDate = ({ date }: { date: string }) => {
	const pd = Temporal.PlainDate.from(date);
	const formatted = pd.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: Temporal.Now.plainDateISO().year === pd.year ? undefined : 'numeric',
	});

	return <div>{formatted}</div>;
};

export const TodoRow = ({ todo }: { todo: Todo }) => {
	const status = STATUSES[todo.status as keyof typeof STATUSES];

	return (
		<Link href={`/todos/${todo.id}`}>
			<div
				className="w-full flex justify-between items-center gap-2 p-2 hover:bg-muted"
				key={todo.id}
			>
				<div className="flex items-center gap-2">
					<status.icon className={status.color} size={16} />
					<div>{todo.title}</div>
				</div>
				<DueDate date={todo.dueDate} />
			</div>
		</Link>
	);
};

export const Playground = () => {
	const { isLoading: isLoadingCategories, data: categories } = db.useQuery({
		categories: { todos: {} },
	});
	const { isLoading: isLoadingTodos, data: todos } = db.useQuery({
		todos: { category: {} },
	});

	if (isLoadingCategories || isLoadingTodos) {
		return null;
	}

	return (
		<>
			<div className="w-full flex flex-col">
				{todos?.todos.map((todo) => (
					<TodoRow key={todo.id} todo={todo} />
				))}
			</div>

			<div>
				<span className="text-xl">categories</span>
				{categories?.categories.map((category) => (
					<div key={category.id}>
						<pre className="text-sm">{JSON.stringify(category, null, 2)} </pre>
						<Link href={`/categories/${category.id}`}>link</Link>
						<Button
							type="button"
							onClick={() => db.transact(db.tx.categories[category.id].delete())}
						>
							delete
						</Button>
					</div>
				))}
				<CategoryForm />
			</div>

			<div className="h-32" />

			<div>
				<span className="text-xl">todos</span>
				{todos?.todos.map((todo) => (
					<div key={todo.id}>
						<pre className="text-sm">{JSON.stringify(todo, null, 2)} </pre>
						<Link href={`/todos/${todo.id}`}>link</Link>
						<Button
							type="button"
							onClick={() => db.transact(db.tx.todos[todo.id].delete())}
						>
							delete
						</Button>
					</div>
				))}
				<TodoForm />
			</div>
		</>
	);
};
