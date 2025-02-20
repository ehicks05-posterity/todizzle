import { Badge } from '@/components/ui/badge';
import type { Todo } from '@/lib/types';
import { getCompletionPercent } from './utils';

export function Progress({ todos }: { todos: Todo[] }) {
	return (
		<div className="flex items-start justify-end w-full">
			<Badge variant="outline">{getCompletionPercent(todos)}</Badge>
		</div>
	);
}
