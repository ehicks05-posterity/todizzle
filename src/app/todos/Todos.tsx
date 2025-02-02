import { db } from '@/components/lib/db';
import type { Todo } from '@/components/lib/types';
import { format, parseISO } from 'date-fns';
import { Link } from 'wouter';
import { Layout } from '../Layout';
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

export default function Page() {
	const { isLoading: isLoadingTodos, data: todos } = db.useQuery({
		todos: { project: {} },
	});

	if (isLoadingTodos) {
		return null;
	}

	return (
		<Layout>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				<div className="w-full flex flex-col p-2">
					{todos?.todos.map((todo) => (
						<TodoRow key={todo.id} todo={todo} />
					))}
				</div>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
		</Layout>
	);
}
