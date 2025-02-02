import { db } from '@/components/lib/db';
import { Layout } from '../Layout';
import { TodoTable } from './TodoTable';

export function Todos() {
	const { isLoading, data } = db.useQuery({
		todos: { project: {} },
	});

	if (isLoading) {
		return null;
	}
	const todos = data?.todos || [];

	return (
		<Layout>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<TodoTable todos={todos} />
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
		</Layout>
	);
}
