import { CalendarPlus } from 'lucide-react';
import { formatDate } from '../todos/utils';

export const AddedOn = ({ date: _date }: { date: string | number }) => {
	const date = new Date(_date);
	return (
		<div
			title={date.toString()}
			className="flex gap-2 px-4 py-2 h-9 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
		>
			<CalendarPlus size={18} />
			Added {formatDate(date)}
		</div>
	);
};
