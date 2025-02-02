import type { Todo } from '@/components/lib/types';
import { TodoRow } from './TodoRow';

export function TodoTable({ todos }: { todos: Todo[] }) {
	return (
		<div className="w-full flex flex-col p-2">
			{todos.map((todo) => (
				<TodoRow key={todo.id} todo={todo} />
			))}
		</div>
	);
}
