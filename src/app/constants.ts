import type { Status } from '@/components/lib/types';
import {
	AlertCircle,
	ChartPie,
	Circle,
	CircleCheckBig,
	CircleDashed,
	CircleX,
	Ellipsis,
	Hexagon,
	Lightbulb,
	type LucideProps,
	Octagon,
	Pentagon,
	Square,
	Triangle,
} from 'lucide-react';
import type { IconType } from 'react-icons/lib';
import {
	PiCellSignalHighFill,
	PiCellSignalLowFill,
	PiCellSignalMediumFill,
} from 'react-icons/pi';

type LucideIcon = React.ForwardRefExoticComponent<
	Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

export const ICONS = {
	circle: Circle,
	square: Square,
	triangle: Triangle,
	pentagon: Pentagon,
	hexagon: Hexagon,
	octagon: Octagon,
	lightBult: Lightbulb,
} as const;

interface StatusMeta {
	name: Status; // included for use in Object.entries situations
	label: string;
	icon: LucideIcon;
	color: string;
	order: number;
	isActive: boolean;
}

export const STATUSES: Record<Status, StatusMeta> = {
	backlog: {
		name: 'backlog',
		label: 'Backlog',
		icon: CircleDashed,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
		order: 3,
		isActive: false,
	},
	todo: {
		name: 'todo',
		label: 'Todo',
		icon: Circle,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
		order: 2,
		isActive: true,
	},
	inProgress: {
		name: 'inProgress',
		label: 'In Progress',
		icon: ChartPie,
		color: 'stroke-[2.5] text-yellow-400 dark:text-yellow-300',
		order: 1,
		isActive: true,
	},
	done: {
		name: 'done',
		label: 'Done',
		icon: CircleCheckBig,
		color: 'stroke-[2.5] text-violet-500 dark:text-violet-400',
		order: 4,
		isActive: false,
	},
	canceled: {
		name: 'canceled',
		label: 'Canceled',
		icon: CircleX,
		color: 'stroke-[2.5] text-neutral-400 dark:text-neutral-500',
		order: 5,
		isActive: false,
	},
} as const;

interface Priority {
	label: string;
	icon: LucideIcon | IconType;
	color: string;
	order: number;
}

export const PRIORITIES: Record<string, Priority> = {
	none: {
		label: 'No Priority',
		icon: Ellipsis,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
		order: 5,
	},
	low: {
		label: 'Low',
		icon: PiCellSignalLowFill,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
		order: 4,
	},
	medium: {
		label: 'Medium',
		icon: PiCellSignalMediumFill,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
		order: 3,
	},
	high: {
		label: 'High',
		icon: PiCellSignalHighFill,
		color: 'stroke-[2.5] text-neutral-500 dark:text-neutral-300',
		order: 2,
	},
	critical: {
		label: 'Critical',
		icon: AlertCircle,
		color: 'stroke-[2.5] text-red-500 dark:text-red-400',
		order: 1,
	},
};
