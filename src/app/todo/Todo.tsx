import { db } from '@/components/lib/db';
import { Layout } from '../Layout';
import { ProjectSelect, StatusDropdown, TodoForm } from '../todos/TodoForm';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({ todos: { $: { where: { id } }, project: {} } });

	const todo = data?.todos[0];
	if (!todo) return null;

	return (
		<Layout>
			<div className="grid gap-4">
				<div
					contentEditable
					className="text-2xl bg-transparent outline-none"
					onBlur={async (e) => {
						const value = e.target.textContent;
						if (value) {
							await db.transact(db.tx.todos[todo.id].update({ title: value }));
						} else {
							e.target.textContent = todo.title;
						}
					}}
				>
					{todo.title}
				</div>
				<div
					contentEditable
					className="bg-transparent outline-none"
					onBlur={async (e) => {
						const value = e.target.textContent;
						if (value) {
							await db.transact(db.tx.todos[todo.id].update({ description: value }));
						} else {
							e.target.textContent = todo.description;
						}
					}}
				>
					{todo.description}
				</div>
				<StatusDropdown
					status={todo.status}
					setStatus={async (status: string) => {
						await db.transact(db.tx.todos[todo.id].update({ status }));
					}}
				/>
				<div className="max-w-sm">
					<ProjectSelect
						projectId={todo.project?.id}
						onChange={async (projectId: string) => {
							if (projectId !== 'no_project') {
								await db.transact(db.tx.todos[todo.id].link({ project: projectId }));
							}
							if (projectId === 'no_project' && todo.project?.id) {
								console.log('yo');
								await db.transact(
									db.tx.todos[todo.id].unlink({ project: todo.project.id }),
								);
							}
						}}
					/>
				</div>
				<div>due date</div>
			</div>
		</Layout>
	);
}
