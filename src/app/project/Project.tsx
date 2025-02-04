import { db } from '@/components/lib/db';
import type { Todo } from '@/components/lib/types';
import { Badge } from '@/components/ui/badge';
import { TodoTable } from '../todos/TodoTable';
import { IconDropdown } from './ProjectInputs';

const getCompletion = (todos: Todo[]) => {
	const denominator = todos.filter((todo) => todo.status !== 'canceled').length;
	const numerator =
		todos.filter((todo) => todo.status === 'done').length +
		todos.filter((todo) => todo.status === 'inProgress').length * 0.5;

	if (denominator === 0) return 0;
	return numerator / denominator;
};

const getCompletionPercent = (todos: Todo[]) =>
	Intl.NumberFormat('en-US', { style: 'percent' }).format(getCompletion(todos));

export function Project({ id }: { id: string }) {
	const { data } = db.useQuery({
		projects: { $: { where: { id } }, todos: { project: {} } },
	});

	const project = data?.projects[0];
	if (!project) return null;

	return (
		<div className="grid gap-4">
			<div className="flex gap-4 max-w-sm -mb-4">
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
						<div className="p-4">This project has 0 todos.</div>
					)}
				</div>
			</div>
			<div className="flex items-start justify-end w-full">
				<Badge variant="outline">
					{getCompletionPercent(project.todos)} complete
				</Badge>
			</div>
		</div>
	);
}
