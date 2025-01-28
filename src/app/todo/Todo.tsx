import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import { Layout } from '../Layout';
import { TodoForm } from '../dashboard/TodoForm';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({ todos: { $: { where: { id } }, category: {} } });

	const todo = data?.todos[0];
	if (!todo) return null;

	return (
		<Layout>
			<pre className="text-sm">{JSON.stringify(todo, null, 2)} </pre>
			<Button
				type="button"
				className="p-2 border border-black"
				onClick={() => db.transact(db.tx.todos[todo.id].delete())}
			>
				delete
			</Button>

			<div className="h-32" />
			<TodoForm key={todo.id} todo={todo} />
		</Layout>
	);
}
