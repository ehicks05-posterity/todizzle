import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ICONS } from './dashboard/icons';

interface Props {
	icon: string;
	setIcon: React.Dispatch<React.SetStateAction<string>>;
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
			<span>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex items-center gap-1">
						<Icon />
					</Button>
				</DropdownMenuTrigger>
			</span>
			<DropdownMenuContent>{ICON_OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};
