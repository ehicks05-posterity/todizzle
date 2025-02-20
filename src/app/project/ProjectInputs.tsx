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

export function IconAndColorDropdown({
	project,
}: { project: { id: string; color: string; icon: string } }) {
	const Icon = ICONS[project.icon as keyof typeof ICONS];

	return (
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="outline">
						<Icon className={THEMES[project.color as keyof typeof THEMES].primary} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex justify-center">
					<DropdownMenuItem>
						<ColorDropdown
							color={project.color}
							setColor={async (color: string) => {
								await db.transact(db.tx.projects[project.id].update({ color }));
							}}
						/>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconDropdown
							icon={project.icon}
							color={project.color}
							idOrHandler={project.id}
						/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export const DeleteProjectButton = ({
	id,
	todoCount,
}: { id: string; todoCount: number }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();

		const message = `Are you sure? ${todoCount} linked todos will be removed from this project.`;
		if (confirm(message)) {
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
