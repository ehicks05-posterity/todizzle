import {
	ChartPie,
	Circle,
	CircleCheckBig,
	CircleDashed,
	CircleX,
} from 'lucide-react';

export const STATUSES = {
	backlog: {
		label: 'Backlog',
		icon: CircleDashed,
		color: 'text-neutral-500 dark:text-neutral-300',
	},
	ready: { label: 'Ready', icon: Circle, color: 'text-blue-500 dark:text-blue-400' },
	inProgress: {
		label: 'In Progress',
		icon: ChartPie,
		color: 'text-yellow-400 dark:text-yellow-300',
	},
	complete: {
		label: 'Complete',
		icon: CircleCheckBig,
		color: 'text-green-500 dark:text-green-400',
	},
	canceled: {
		label: 'Canceled',
		icon: CircleX,
		color: 'text-neutral-400 dark:text-neutral-500',
	},
};
