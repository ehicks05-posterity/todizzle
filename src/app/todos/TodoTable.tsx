import type { Todo } from '@/components/lib/types';
import { Button } from '@/components/ui/button';
import { groupBy } from 'lodash-es';
import { useState } from 'react';
import { STATUSES } from '../constants';
import { TodoRow } from './TodoRow';

export function TodoTable({ todos }: { todos: Todo[] }) {
	const todosByStatus = groupBy(todos, 'status');
	const [statusToggle, setStatusToggle] = useState('all');

	return (
		<div className="w-full flex flex-col p-2 gap-2">
			<div className="flex gap-2">
				<Button
					size="sm"
					variant={statusToggle === 'all' ? 'outline' : 'ghost'}
					onClick={() => setStatusToggle('all')}
				>
					All Issues
				</Button>
				<Button
					size="sm"
					variant={statusToggle === 'active' ? 'outline' : 'ghost'}
					onClick={() => setStatusToggle('active')}
				>
					Active
				</Button>
			</div>
			{Object.entries(todosByStatus)
				.filter(([statusName]) => {
					const status = STATUSES[statusName as keyof typeof STATUSES];
					return (
						statusToggle === 'all' || (statusToggle === 'active' && status.isActive)
					);
				})
				.sort(
					([o1], [o2]) =>
						STATUSES[o1 as keyof typeof STATUSES].order -
						STATUSES[o2 as keyof typeof STATUSES].order,
				)
				.map(([statusName, todosInStatus]) => {
					const status = STATUSES[statusName as keyof typeof STATUSES];
					return (
						<div key={statusName}>
							<div className="flex items-center gap-2 p-1">
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
