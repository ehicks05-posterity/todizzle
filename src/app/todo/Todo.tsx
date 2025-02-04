import { db } from '@/components/lib/db';
import type { Priority } from '@/components/lib/types';
import {
	DueDatePicker,
	PriorityDropdown,
	ProjectSelect,
	StatusDropdown,
} from '../todos/TodoInputs';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({
		todos: { $: { where: { id } }, project: {} },
		projects: {},
	});

	const todo = data?.todos[0];
	const projects = data?.projects || [];
	if (!todo) return null;

	return (
		<div className="grid gap-4 p-4 bg-muted/50 rounded-lg">
			<div
				contentEditable
				className="text-3xl font-bold bg-transparent outline-none"
				onBlur={async (e) => {
					const value = e.target.textContent;
					if (value) {
						await db.transact(db.tx.todos[todo.id].update({ title: value }));
					} else {
						e.target.textContent = todo.title;
					}
				}}
				suppressContentEditableWarning
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
				suppressContentEditableWarning
			>
				{todo.description || 'Add a description...'}
			</div>
			<div className="grid grid-cols-2 gap-4 max-w-sm">
				<StatusDropdown status={todo.status} idOrHandler={todo.id} />
				<PriorityDropdown priority={todo.priority} idOrHandler={todo.id} />
				<ProjectSelect
					projects={projects}
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
	);
}
