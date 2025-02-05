import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { THEMES } from '@/constants/colors';
import { ICONS } from '@/constants/icons';
import { db } from '@/lib/db';

interface Props {
	icon: string;
	color: string;
	idOrHandler: string | ((icon: string) => void);
}

export const IconDropdown = ({ icon, color, idOrHandler }: Props) => {
	const Icon = ICONS[icon as keyof typeof ICONS];
	const colorMeta = THEMES[color as keyof typeof THEMES];

	const handleClick =
		typeof idOrHandler === 'string'
			? (icon: string) => db.transact(db.tx.projects[idOrHandler].update({ icon }))
			: idOrHandler;

	const ICON_OPTIONS = Object.entries(ICONS).map(([name, Icon]) => (
		<DropdownMenuItem
			key={name}
			onClick={(e) => {
				e.stopPropagation();
				handleClick(name);
			}}
		>
			<Icon className={colorMeta.primary} />
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Icon className={colorMeta.primary} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="grid grid-cols-6">
				{ICON_OPTIONS}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface ColorDropdownProps {
	color: string;
	setColor: (icon: string) => void;
}

export const ColorDropdown = ({ color, setColor }: ColorDropdownProps) => {
	const colorMeta = THEMES[color as keyof typeof THEMES];

	const COLOR_OPTIONS = Object.entries(THEMES).map(([name, meta]) => (
		<DropdownMenuItem
			key={name}
			onClick={(e) => {
				e.stopPropagation();
				setColor(name);
			}}
			title={meta.label}
		>
			<div className={`h-5 w-5 rounded ${meta.primaryBg}`} />
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" title={colorMeta.label}>
					<div className={`h-5 w-5 rounded ${colorMeta.primaryBg}`} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="grid grid-cols-6">
				{COLOR_OPTIONS}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const DeleteProjectButton = ({ id }: { id: string }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (confirm('Are you sure?')) {
			db.transact(db.tx.projects[id].delete());
		}
	};

	return (
		<Button
			type="button"
			size="sm"
			variant="destructive"
			onClick={(e) => handleClick(e)}
		>
			Delete
		</Button>
	);
};
