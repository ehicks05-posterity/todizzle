import { db } from '@/components/lib/db';
import { Layout } from '../Layout';
import {
	DueDatePicker,
	PriorityDropdown,
	ProjectSelect,
	StatusDropdown,
} from '../todos/TodoForm';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({ todos: { $: { where: { id } }, project: {} } });

	const todo = data?.todos[0];
	if (!todo) return null;

	return (
		<Layout>
			<div className="grid gap-8">
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
					className={`focus:text-inherit bg-transparent outline-none ${!todo.description ? 'text-neutral-400' : ''}`}
					onBlur={async (e) => {
						const value = e.target.textContent || undefined;
						await db.transact(db.tx.todos[todo.id].update({ description: value }));
						e.target.textContent = value || 'Add a description...';
					}}
					onFocus={(e) => {
						if (!todo.description) {
							e.target.textContent = '';
						}
					}}
				>
					{todo.description || 'Add a description...'}
				</div>
				<div className="grid grid-cols-2 gap-4 max-w-sm">
					<StatusDropdown
						status={todo.status}
						setStatus={async (status: string) => {
							await db.transact(db.tx.todos[todo.id].update({ status }));
						}}
					/>
					<PriorityDropdown
						priority={todo.priority}
						setPriority={async (priority?: string) => {
							await db.transact(db.tx.todos[todo.id].update({ priority }));
						}}
					/>
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
					<DueDatePicker
						dueDate={todo.dueDate}
						handleSelect={async (date?: Date) => {
							const dueDate = date ? date.toISOString() : undefined;
							await db.transact(db.tx.todos[todo.id].update({ dueDate }));
						}}
					/>
				</div>
			</div>
		</Layout>
	);
}
