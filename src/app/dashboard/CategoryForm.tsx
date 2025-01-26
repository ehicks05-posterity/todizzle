import { db } from '@/components/lib/db';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { id } from '@instantdb/react';
import { useState } from 'react';
import type { Category } from '../../components/lib/types';
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
				<DropdownMenuTrigger>
					<Icon />
				</DropdownMenuTrigger>
			</span>
			<DropdownMenuContent>{ICON_OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const CategoryForm = ({ category }: { category?: Category }) => {
	const [name, setName] = useState(category?.name || '');
	const [icon, setIcon] = useState(category?.icon || 'circle');

	const handleSave = () => {
		const categoryId = category?.id || id();
		db.transact(db.tx.categories[categoryId].update({ name, icon }));
		setName(category?.name || '');
		setIcon(category?.icon || 'circle');
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				value={name}
				placeholder="name"
				onChange={(e) => setName(e.target.value)}
			/>
			<IconDropdown icon={icon} setIcon={setIcon} />
			<button type="button" className="p-2 border border-black" onClick={handleSave}>
				{category ? 'Update' : 'Add'} Category
			</button>
		</div>
	);
};
