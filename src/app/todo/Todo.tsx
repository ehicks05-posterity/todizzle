import { db } from '@/components/lib/db';
import { Layout } from '../Layout';
import { TodoForm } from '../dashboard/TodoForm';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({ todos: { $: { where: { id } }, project: {} } });

	const todo = data?.todos[0];
	if (!todo) return null;

	return (
		<Layout>
			<TodoForm key={todo.id} todo={todo} />
		</Layout>
	);
}
