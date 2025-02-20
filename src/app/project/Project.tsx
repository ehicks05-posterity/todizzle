import { db } from '@/lib/db';
import { TodoTable } from '../todos/TodoTable';
import { IconAndColorDropdown } from './ProjectInputs';
import { RadialChart } from './RadialChart';
import { getCompletion, getCompletionPercent } from './utils';

export function Project({ id }: { id: string }) {
	const { data } = db.useQuery({
		projects: { $: { where: { id } }, todos: { project: {} } },
	});

	const project = data?.projects[0];
	if (!project) return null;

	return (
		<div className="grid gap-4">
			<div className="flex flex-col gap-2 p-4 bg-sidebar-accent/50 rounded-lg">
				<div className="flex justify-between items-center">
					<div
						contentEditable
						className="text-3xl font-bold bg-transparent outline-hidden"
						onBlur={async (e) => {
							const value = e.target.textContent;
							if (value) {
								await db.transact(
									db.tx.projects[project.id].update({ title: value }),
								);
							} else {
								e.target.textContent = project.title;
							}
						}}
						suppressContentEditableWarning
					>
						{project.title}
					</div>
					<IconAndColorDropdown project={project} />
				</div>
				<div
					contentEditable
					className={`focus:text-inherit bg-transparent outline-hidden ${!project.description ? 'text-neutral-400' : ''}`}
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
			</div>

			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<div className="w-full flex flex-col p-2">
					<TodoTable todos={project.todos} />
					{project.todos.length === 0 && (
						<div className="p-4">This project has 0 todos.</div>
					)}
				</div>
			</div>
			<div className="flex justify-end">
				<RadialChart
					value={getCompletion(project.todos)}
					label={getCompletionPercent(project.todos)}
				/>
			</div>
		</div>
	);
}
