import { db } from '@/components/lib/db';
import { Link } from 'wouter';
import { CategoryForm } from './CategoryForm';
import { TodoForm } from './TodoForm';

export const Playground = () => {
	const { data: categories } = db.useQuery({ categories: { todos: {} } });
	const { data: todos } = db.useQuery({ todos: { category: {} } });

	return (
		<>
			<div>
				<span className="text-xl">categories</span>
				{categories?.categories.map((category) => (
					<div key={category.id}>
						<pre className="text-sm">{JSON.stringify(category, null, 2)} </pre>
						<Link href={`/categories/${category.id}`}>link</Link>
						<button
							type="button"
							className="p-2 border border-black"
							onClick={() => db.transact(db.tx.categories[category.id].delete())}
						>
							delete
						</button>
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
						<button
							type="button"
							className="p-2 border border-black"
							onClick={() => db.transact(db.tx.todos[todo.id].delete())}
						>
							delete
						</button>
					</div>
				))}
				<TodoForm />
			</div>
		</>
	);
};
