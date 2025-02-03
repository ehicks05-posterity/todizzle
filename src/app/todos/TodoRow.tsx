import type { Todo } from '@/components/lib/types';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { Link } from 'wouter';
import { ICONS } from '../constants';
import { PriorityDropdown, StatusDropdown } from './TodoInputs';

export const DueDate = ({ date: _date }: { date: string }) => {
	const date = format(parseISO(_date), 'PP');
	return <div>{date}</div>;
};

export const TodoRow = ({ todo }: { todo: Todo }) => {
	const ProjectIcon = ICONS[todo.project?.icon as keyof typeof ICONS];

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
				{todo.project?.title && (
					<Badge variant="secondary" className="flex gap-2">
						<ProjectIcon size={14} />
						{todo.project.title}
					</Badge>
				)}
				{todo.dueDate && <DueDate date={todo.dueDate.toString()} />}
			</div>
		</Link>
	);
};
