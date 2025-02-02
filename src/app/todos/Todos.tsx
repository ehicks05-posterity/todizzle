import { db } from '@/components/lib/db';
import { Layout } from '../Layout';
import { TodoRow } from './TodoRow';

export function Todos() {
	const { isLoading: isLoadingTodos, data: todos } = db.useQuery({
		todos: { project: {} },
	});

	if (isLoadingTodos) {
		return null;
	}

	return (
		<Layout>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<div className="w-full flex flex-col p-2">
					{todos?.todos.map((todo) => (
						<TodoRow key={todo.id} todo={todo} />
					))}
				</div>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
		</Layout>
	);
}
