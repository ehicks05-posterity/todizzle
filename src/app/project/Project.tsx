import { db } from '@/components/lib/db';
import { TodoDialog } from '../TodoDialog';
import { TodoTable } from '../todos/TodoTable';
import { IconDropdown } from './ProjectInputs';

export function Project({ id }: { id: string }) {
	const { data } = db.useQuery({
		projects: { $: { where: { id } }, todos: { project: {} } },
	});

	const project = data?.projects[0];
	if (!project) return null;

	return (
		<div className="grid gap-4">
			<div className="grid grid-cols-2 gap-4 max-w-sm -mb-4">
				<IconDropdown
					icon={project.icon}
					setIcon={async (icon: string) => {
						await db.transact(db.tx.projects[project.id].update({ icon }));
					}}
				/>
			</div>
			<div
				contentEditable
				className="text-3xl font-bold bg-transparent outline-none"
				onBlur={async (e) => {
					const value = e.target.textContent;
					if (value) {
						await db.transact(db.tx.projects[project.id].update({ title: value }));
					} else {
						e.target.textContent = project.title;
					}
				}}
				suppressContentEditableWarning
			>
				{project.title}
			</div>
			<div
				contentEditable
				className={`focus:text-inherit bg-transparent outline-none ${!project.description ? 'text-neutral-400' : ''}`}
				onBlur={async (e) => {
					const value = e.target.textContent || undefined;
					await db.transact(
						db.tx.projects[project.id].update({ description: value }),
					);
					e.target.textContent = value || 'Add a description...';
				}}
				onFocus={(e) => {
					if (!project.description) {
						e.target.textContent = '';
					}
				}}
				suppressContentEditableWarning
			>
				{project.description || 'Add a description...'}
			</div>

			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<div className="w-full flex flex-col p-2">
					<TodoTable todos={project.todos} />
					{project.todos.length === 0 && (
						<div className="grid gap-8">This project has 0 todos.</div>
					)}
				</div>
			</div>
			<div className="w-fit">
				<TodoDialog defaults={{ projectId: project.id }} />
			</div>
		</div>
	);
}
