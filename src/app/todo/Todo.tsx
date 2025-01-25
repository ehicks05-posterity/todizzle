import { db } from '@/components/lib/db';
import { Layout } from '../Layout';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({ todos: { $: { where: { id } } } });

	const todo = data?.todos[0];
	if (!todo) return null;

	return (
		<Layout>
			<pre className="text-sm">{JSON.stringify(todo, null, 2)} </pre>
			<button
				type="button"
				className="p-2 border border-black"
				onClick={() => db.transact(db.tx.todos[todo.id].delete())}
			>
				delete
			</button>
		</Layout>
	);
}
