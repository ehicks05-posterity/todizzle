import { CalendarPlus } from 'lucide-react';
import { formatDate } from '../todos/utils';

export const CreatedAt = ({ date: _date }: { date: string | number }) => {
	const date = new Date(_date);
	return (
		<div
			title={date.toString()}
			className="flex gap-2 px-4 py-2 h-9 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
		>
			<CalendarPlus size={18} />
			Created {formatDate(date)}
		</div>
	);
};
