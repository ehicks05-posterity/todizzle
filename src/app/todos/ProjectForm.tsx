import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { id } from '@instantdb/react';
import { useState } from 'react';
import type { Project } from '../../components/lib/types';
import { ICONS } from './icons';

const IconDropdown = ({
	icon,
	setIcon,
}: {
	icon: string;
	setIcon: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

export const ProjectForm = ({ project }: { project?: Project }) => {
	const [name, setName] = useState(project?.name || '');
	const [icon, setIcon] = useState(project?.icon || 'circle');

	const handleSave = () => {
		const projectId = project?.id || id();
		db.transact(db.tx.projects[projectId].update({ name, icon }));
		setName(project?.name || '');
		setIcon(project?.icon || 'circle');
	};

	return (
		<div className="flex flex-col gap-2">
			<Input
				value={name}
				placeholder="name"
				onChange={(e) => setName(e.target.value)}
			/>
			<IconDropdown icon={icon} setIcon={setIcon} />
			<Button type="button" className="p-2 border border-black" onClick={handleSave}>
				Save changes
			</Button>
		</div>
	);
};
