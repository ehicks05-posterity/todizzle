import Novel from '@/components/novel/Novel';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import {
	DeleteTodoButton,
	DueDatePicker,
	PriorityDropdown,
	ProjectDropdown,
	StatusDropdown,
} from '../todos/TodoInputs';
import { AddedOn } from './AddedOn';

export function Todo({ id }: { id: string }) {
	const { data } = db.useQuery({ todos: { $: { where: { id } }, project: {} } });

	const todo = data?.todos[0];
	if (!todo) return null;

	return (
		<div className="flex flex-col md:flex-row gap-4">
			<div className="w-full">
				<div className="grid bg-muted/50 rounded-lg">
					<div
						contentEditable
						className="p-4 text-3xl font-bold bg-transparent outline-hidden"
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
					<Separator />

					<Novel
						content={todo.description}
						onUpdate={(content) =>
							db.transact(db.tx.todos[todo.id].update({ description: content }))
						}
					/>
				</div>
			</div>
			<div className="p-4 bg-muted/50 rounded-lg">
				<div className="flex flex-col gap-4">
					<StatusDropdown status={todo.status} idOrHandler={todo.id} />
					<PriorityDropdown priority={todo.priority} idOrHandler={todo.id} />
					<ProjectDropdown projectId={todo.project?.id} idOrHandler={todo.id} />
					<DueDatePicker
						dueDate={todo.dueDate}
						handleSelect={async (date?: Date) => {
							const dueDate = date ? date.toISOString() : undefined;
							await db.transact(db.tx.todos[todo.id].update({ dueDate }));
						}}
					/>
					<Separator className="col-span-full" />
					<AddedOn date={todo.createdAt} />
					<DeleteTodoButton id={todo.id} />
				</div>
			</div>
		</div>
	);
}
