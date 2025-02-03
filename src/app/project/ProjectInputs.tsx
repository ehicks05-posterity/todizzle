import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ICONS } from '../constants';

interface Props {
	icon: string;
	setIcon: (icon: string) => void;
}

export const IconDropdown = ({ icon, setIcon }: Props) => {
	const Icon = ICONS[icon as keyof typeof ICONS];

	const ICON_OPTIONS = Object.entries(ICONS).map(([name, Icon]) => (
		<DropdownMenuItem key={name} onClick={() => setIcon(name)}>
			<Icon />
			{name}
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Icon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>{ICON_OPTIONS}</DropdownMenuContent>
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
		<Button type="button" variant="destructive" onClick={(e) => handleClick(e)}>
			Delete
		</Button>
	);
};
