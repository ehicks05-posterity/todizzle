import { db } from '@/lib/db';
import { TodoTable } from './TodoTable';

export function Todos() {
	const { data } = db.useQuery({ todos: { project: {} } });
	const todos = data?.todos || [];

	return (
		<>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<TodoTable todos={todos} />
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
		</>
	);
}
