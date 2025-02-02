import type { Todo } from '@/components/lib/types';
import { format, parseISO } from 'date-fns';
import { Link } from 'wouter';
import { STATUSES } from '../constants';

export const DueDate = ({ date: _date }: { date: string }) => {
	const date = format(parseISO(_date), 'PP');
	return <div>{date}</div>;
};

export const TodoRow = ({ todo }: { todo: Todo }) => {
	const status = STATUSES[todo.status as keyof typeof STATUSES];

	return (
		<Link href={`/todos/${todo.id}`}>
			<div
				className="w-full flex justify-between items-center gap-2 p-2 text-sm rounded-lg hover:bg-muted"
				key={todo.id}
			>
				<div className="flex items-center gap-2">
					<status.icon className={status.color} size={16} />
					<div>{todo.title}</div>
				</div>
				{todo.dueDate && <DueDate date={todo.dueDate.toString()} />}
			</div>
		</Link>
	);
};
