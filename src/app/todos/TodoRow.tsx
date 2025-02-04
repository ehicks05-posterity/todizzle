import { db } from '@/components/lib/db';
import type { Todo } from '@/components/lib/types';
import { Link } from 'wouter';
import {
	DueDatePicker,
	PriorityDropdown,
	ProjectDropdown,
	StatusDropdown,
} from './TodoInputs';

export const TodoRow = ({ todo }: { todo: Todo }) => {
	return (
		<Link href={`/todos/${todo.id}`}>
			<div
				className="w-full flex justify-between items-center gap-2 px-2 text-sm rounded-lg hover:bg-muted"
				key={todo.id}
			>
				<div className="flex items-center gap-2">
					<PriorityDropdown
						priority={todo.priority}
						idOrHandler={todo.id}
						variant="icon"
					/>
					<StatusDropdown
						status={todo.status}
						idOrHandler={todo.id}
						variant="icon"
					/>
					<div>{todo.title}</div>
				</div>
				<div className="hidden sm:flex items-center gap-2">
					{todo.project?.id && (
						<ProjectDropdown projectId={todo.project.id} idOrHandler={todo.id} />
					)}
					{todo.dueDate && (
						<DueDatePicker
							dueDate={todo.dueDate.toString()}
							handleSelect={async (date?: Date) => {
								const dueDate = date ? date.toISOString() : undefined;
								await db.transact(db.tx.todos[todo.id].update({ dueDate }));
							}}
						/>
					)}
				</div>
			</div>
		</Link>
	);
};
