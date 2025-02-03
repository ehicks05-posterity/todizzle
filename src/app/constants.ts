import {
	AlertCircle,
	ChartPie,
	Circle,
	CircleCheckBig,
	CircleDashed,
	CircleX,
	Ellipsis,
	Hexagon,
	Octagon,
	Pentagon,
	Square,
	Triangle,
} from 'lucide-react';
import {
	PiCellSignalHighFill,
	PiCellSignalLowFill,
	PiCellSignalMediumFill,
} from 'react-icons/pi';

export const ICONS = {
	circle: Circle,
	square: Square,
	triangle: Triangle,
	pentagon: Pentagon,
	hexagon: Hexagon,
	octagon: Octagon,
} as const;

export const STATUSES = {
	backlog: {
		label: 'Backlog',
		icon: CircleDashed,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
	},
	todo: {
		label: 'Todo',
		icon: Circle,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
	},
	inProgress: {
		label: 'In Progress',
		icon: ChartPie,
		color: 'stroke-[2.5] text-yellow-400 dark:text-yellow-300',
	},
	complete: {
		label: 'Complete',
		icon: CircleCheckBig,
		color: 'stroke-[2.5] text-violet-500 dark:text-violet-400',
	},
	canceled: {
		label: 'Canceled',
		icon: CircleX,
		color: 'stroke-[2.5] text-neutral-400 dark:text-neutral-500',
	},
};

export const PRIORITIES = {
	none: {
		label: 'No Priority',
		icon: Ellipsis,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
	},
	low: {
		label: 'Low',
		icon: PiCellSignalLowFill,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
	},
	medium: {
		label: 'Medium',
		icon: PiCellSignalMediumFill,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
	},
	high: {
		label: 'High',
		icon: PiCellSignalHighFill,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
	},
	critical: {
		label: 'Critical',
		icon: AlertCircle,
		color: 'stroke-[2.5] text-red-500 dark:text-red-400',
	},
};
