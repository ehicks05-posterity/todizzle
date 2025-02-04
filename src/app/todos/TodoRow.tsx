import type { Todo } from '@/components/lib/types';
import { format, parseISO } from 'date-fns';
import { Link } from 'wouter';
import { PriorityDropdown, ProjectDropdown, StatusDropdown } from './TodoInputs';

export const DueDate = ({ date: _date }: { date: string }) => {
	const date = format(parseISO(_date), 'PP');
	return <div>{date}</div>;
};

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
				{todo.project?.id && (
					<ProjectDropdown projectId={todo.project.id} idOrHandler={todo.id} />
				)}
				{todo.dueDate && <DueDate date={todo.dueDate.toString()} />}
			</div>
		</Link>
	);
};
