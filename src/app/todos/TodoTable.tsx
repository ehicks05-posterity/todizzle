import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Todo } from '@/lib/types';
import { useState } from 'react';
import { PRIORITIES, STATUSES } from '../constants';
import { TodoRow } from './TodoRow';

export function TodoTable({ todos: _todos }: { todos: Todo[] }) {
	const [statusToggle, setStatusToggle] = useState('all');
	const [orderField, setOrderField] = useState<'status' | 'priority'>('status');

	const todos = _todos.filter((todo) => {
		const status = STATUSES[todo.status];
		return statusToggle === 'all' || (statusToggle === 'active' && status.isActive);
	});

	const groupedTodos =
		orderField === 'status'
			? Object.groupBy(todos, (todo) => todo.status)
			: Object.groupBy(todos, (todo) => todo.priority);

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
				<Separator orientation="vertical" className="h-5" />
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
				.sort(([, arr1], [, arr2]) =>
					orderField === 'status'
						? STATUSES[arr1[0].status].order - STATUSES[arr2[0].status].order
						: PRIORITIES[arr1[0].priority].order -
							PRIORITIES[arr2[0].priority].order,
				)
				.map(([groupName, todosInGroup]) => {
					const grouping =
						orderField === 'status'
							? STATUSES[todosInGroup[0].status]
							: PRIORITIES[todosInGroup[0].priority] || PRIORITIES.none;
					return (
						<div key={groupName}>
							<div className="flex items-center gap-2 p-2 pb-1 mt-2 font-semibold text-neutral-700 dark:text-neutral-300">
								<grouping.icon className={`ml-2.5 ${grouping.color}`} size={16} />
								{grouping.label}
							</div>
							<Separator className="m-1" />
							{todosInGroup.map((todo) => (
								<TodoRow key={todo.id} todo={todo} />
							))}
						</div>
					);
				})}
		</div>
	);
}
