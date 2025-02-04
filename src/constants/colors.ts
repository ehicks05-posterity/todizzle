export type Color =
	| 'red'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'green'
	| 'emerald'
	| 'teal'
	| 'cyan'
	| 'sky'
	| 'blue'
	| 'indigo'
	| 'violet'
	| 'purple'
	| 'fuchsia'
	| 'pink'
	| 'rose'
	| 'stone';

export type ThemeMeta = {
	label: string;
	primary: string;
	primaryBg: string;
	subtle: string;
	subtleBg: string;
};

export const THEMES: Record<Color, ThemeMeta> = {
	red: {
		label: 'Red',
		primary: 'text-red-500',
		primaryBg: 'bg-red-500',
		subtle: 'text-red-100 dark:text-red-900',
		subtleBg: 'bg-red-100 dark:bg-red-900',
	},
	orange: {
		label: 'Orange',
		primary: 'text-orange-500',
		primaryBg: 'bg-orange-500',
		subtle: 'text-orange-100 dark:text-orange-900',
		subtleBg: 'bg-orange-100 dark:bg-orange-900',
	},
	amber: {
		label: 'Amber',
		primary: 'text-amber-500',
		primaryBg: 'bg-amber-500',
		subtle: 'text-amber-100 dark:text-amber-900',
		subtleBg: 'bg-amber-100 dark:bg-amber-900',
	},
	yellow: {
		label: 'Yellow',
		primary: 'text-yellow-500',
		primaryBg: 'bg-yellow-500',
		subtle: 'text-yellow-100 dark:text-yellow-900',
		subtleBg: 'bg-yellow-100 dark:bg-yellow-900',
	},
	lime: {
		label: 'Lime',
		primary: 'text-lime-500',
		primaryBg: 'bg-lime-500',
		subtle: 'text-lime-100 dark:text-lime-900',
		subtleBg: 'bg-lime-100 dark:bg-lime-900',
	},
	green: {
		label: 'Green',
		primary: 'text-green-500',
		primaryBg: 'bg-green-500',
		subtle: 'text-green-100 dark:text-green-900',
		subtleBg: 'bg-green-100 dark:bg-green-900',
	},
	emerald: {
		label: 'Emerald',
		primary: 'text-emerald-500',
		primaryBg: 'bg-emerald-500',
		subtle: 'text-emerald-100 dark:text-emerald-900',
		subtleBg: 'bg-emerald-100 dark:bg-emerald-900',
	},
	teal: {
		label: 'Teal',
		primary: 'text-teal-500',
		primaryBg: 'bg-teal-500',
		subtle: 'text-teal-100 dark:text-teal-900',
		subtleBg: 'bg-teal-100 dark:bg-teal-900',
	},
	cyan: {
		label: 'Cyan',
		primary: 'text-cyan-500',
		primaryBg: 'bg-cyan-500',
		subtle: 'text-cyan-100 dark:text-cyan-900',
		subtleBg: 'bg-cyan-100 dark:bg-cyan-900',
	},
	sky: {
		label: 'Sky',
		primary: 'text-sky-500',
		primaryBg: 'bg-sky-500',
		subtle: 'text-sky-100 dark:text-sky-900',
		subtleBg: 'bg-sky-100 dark:bg-amber-900',
	},
	blue: {
		label: 'Blue',
		primary: 'text-blue-500',
		primaryBg: 'bg-blue-500',
		subtle: 'text-blue-100 dark:text-blue-900',
		subtleBg: 'bg-blue-100 dark:bg-blue-900',
	},
	indigo: {
		label: 'Indigo',
		primary: 'text-indigo-500',
		primaryBg: 'bg-indigo-500',
		subtle: 'text-indigo-100 dark:text-indigo-900',
		subtleBg: 'bg-indigo-100 dark:bg-indigo-900',
	},
	violet: {
		label: 'Violet',
		primary: 'text-violet-500',
		primaryBg: 'bg-violet-500',
		subtle: 'text-violet-100 dark:text-violet-900',
		subtleBg: 'bg-violet-100 dark:bg-violet-900',
	},
	purple: {
		label: 'Purple',
		primary: 'text-purple-500',
		primaryBg: 'bg-purple-500',
		subtle: 'text-purple-100 dark:text-purple-900',
		subtleBg: 'bg-purple-100 dark:bg-purple-900',
	},
	fuchsia: {
		label: 'Fuchsia',
		primary: 'text-fuchsia-500',
		primaryBg: 'bg-fuchsia-500',
		subtle: 'text-fuchsia-100 dark:text-fuchsia-900',
		subtleBg: 'bg-fuchsia-100 dark:bg-fuchsia-900',
	},
	pink: {
		label: 'Pink',
		primary: 'text-pink-500',
		primaryBg: 'bg-pink-500',
		subtle: 'text-pink-100 dark:text-pink-900',
		subtleBg: 'bg-pink-100 dark:bg-pink-900',
	},
	rose: {
		label: 'Rose',
		primary: 'text-rose-500',
		primaryBg: 'bg-rose-500',
		subtle: 'text-rose-100 dark:text-rose-900',
		subtleBg: 'bg-rose-100 dark:bg-rose-900',
	},
	stone: {
		label: 'Stone',
		primary: 'text-stone-500',
		primaryBg: 'bg-stone-500',
		subtle: 'text-stone-100 dark:text-stone-900',
		subtleBg: 'bg-stone-100 dark:bg-stone-900',
	},
} as const;
