import { ChartPie, Circle, CircleCheck, CircleDashed, CircleX } from 'lucide-react';

export const STATUSES = {
	backlog: { label: 'Backlog', icon: CircleDashed, color: 'text-neutral-300' },
	ready: { label: 'Ready', icon: Circle, color: 'text-blue-300' },
	inProgress: {
		label: 'In Progress',
		icon: ChartPie,
		color: 'text-yellow-300',
	},
	complete: {
		label: 'Complete',
		icon: CircleCheck,
		color: 'text-green-400',
	},
	canceled: {
		label: 'Canceled',
		icon: CircleX,
		color: 'text-neutral-500',
	},
};
