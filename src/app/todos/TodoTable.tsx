import type { Todo } from '@/components/lib/types';
import { Button } from '@/components/ui/button';
import { groupBy } from 'lodash-es';
import { useState } from 'react';
import { PRIORITIES, STATUSES } from '../constants';
import { TodoRow } from './TodoRow';

export function TodoTable({ todos }: { todos: Todo[] }) {
	const [statusToggle, setStatusToggle] = useState('all');
	const [orderField, setOrderField] = useState<'status' | 'priority'>('status');

	const statusFilteredTodos = todos.filter((todo) => {
		const status = STATUSES[todo.status as keyof typeof STATUSES];
		return statusToggle === 'all' || (statusToggle === 'active' && status.isActive);
	});

	const todosByStatus = groupBy(statusFilteredTodos, 'status');
	const todosByPriority = groupBy(statusFilteredTodos, 'priority');
	const groupedTodos = orderField === 'status' ? todosByStatus : todosByPriority;

	return (
		<div className="w-full flex flex-col p-2 gap-2">
			<div className="flex gap-2 items-center">
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
				<div className="h-4 w-px mx-2 bg-neutral-700" />
				<Button
					size="sm"
					variant={orderField === 'status' ? 'outline' : 'ghost'}
					onClick={() => setOrderField('status')}
				>
					By Status
				</Button>
				<Button
					size="sm"
					variant={orderField === 'priority' ? 'outline' : 'ghost'}
					onClick={() => setOrderField('priority')}
				>
					By Priority
				</Button>
			</div>
			{Object.entries(groupedTodos)
				.sort(([o1], [o2]) =>
					orderField === 'status'
						? STATUSES[o1].order - STATUSES[o2].order
						: PRIORITIES[o1]?.order - PRIORITIES[o2]?.order,
				)
				.map(([groupName, todosInStatus]) => {
					const grouping =
						orderField === 'status'
							? STATUSES[groupName]
							: PRIORITIES[groupName] || PRIORITIES.none;
					return (
						<div key={groupName}>
							<div className="flex items-center gap-2 p-1 border-b mt-2">
								{grouping.label}
								<grouping.icon className={grouping.color} size={16} />
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
