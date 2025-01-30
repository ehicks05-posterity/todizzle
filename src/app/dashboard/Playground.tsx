import { db } from '@/components/lib/db';
import type { Todo } from '@/components/lib/types';
import { Temporal } from 'temporal-polyfill';
import { Link } from 'wouter';
import { STATUSES } from '../constants';

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
				<DueDate date={todo.dueDate.toString()} />
			</div>
		</Link>
	);
};

export const Playground = () => {
	const { isLoading: isLoadingTodos, data: todos } = db.useQuery({
		todos: { category: {} },
	});

	if (isLoadingTodos) {
		return null;
	}

	return (
		<div className="w-full flex flex-col">
			{todos?.todos.map((todo) => (
				<TodoRow key={todo.id} todo={todo} />
			))}
		</div>
	);
};
