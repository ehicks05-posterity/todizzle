import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Layout } from '../Layout';
import { ProjectSelect, StatusDropdown } from '../todos/TodoForm';

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
				<div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn(
									'w-[280px] justify-start text-left font-normal',
									!todo.dueDate && 'text-muted-foreground',
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{todo.dueDate ? (
									`Due ${format(new Date(String(todo.dueDate)), 'PP')}`
								) : (
									<span>Set a due date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={new Date(todo.dueDate)}
								onSelect={async (date) => {
									const dueDate = date ? date.toISOString() : undefined;
									await db.transact(db.tx.todos[todo.id].update({ dueDate }));
								}}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</Layout>
	);
}
