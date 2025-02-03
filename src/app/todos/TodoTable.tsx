import type { Todo } from '@/components/lib/types';
import { groupBy } from 'lodash-es';
import { STATUSES } from '../constants';
import { TodoRow } from './TodoRow';

export function TodoTable({ todos }: { todos: Todo[] }) {
	const todosByStatus = groupBy(todos, 'status');

	return (
		<div className="w-full flex flex-col p-2">
			{Object.entries(todosByStatus)
				.sort(
					([o1], [o2]) =>
						STATUSES[o1 as keyof typeof STATUSES].order -
						STATUSES[o2 as keyof typeof STATUSES].order,
				)
				.map(([statusName, todosInStatus]) => {
					const status = STATUSES[statusName as keyof typeof STATUSES];
					return (
						<div key={statusName}>
							<div className="flex items-center gap-2">
								{status.label}
								<status.icon className={status.color} size={16} />
							</div>
							{todosInStatus.map((todo) => (
								<TodoRow key={todo.id} todo={todo} />
							))}
						</div>
					);
				})}
		</div>
	);
}
