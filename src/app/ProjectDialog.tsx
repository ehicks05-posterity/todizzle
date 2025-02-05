import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { db } from '@/lib/db';
import { id } from '@instantdb/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ColorDropdown, IconDropdown } from './project/ProjectInputs';

export function ProjectDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [icon, setIcon] = useState('scan');
	const [color, setColor] = useState('blue');

	const handleSave = async () => {
		const projectId = id();
		await db.transact(db.tx.projects[projectId].update({ title, icon, color }));
		setIsOpen(false);
	};

	const isValid = title.length > 0;

	return (
		<Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<SidebarMenuButton variant="outline">
					<Plus />
					New
				</SidebarMenuButton>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create project</DialogTitle>
					<DialogDescription>
						Add a new project here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<div className="grid grid-cols-2 gap-4 py-4">
					<div className="grid col-span-2 w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid col-span-2 w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="description">Description</Label>
						<Input
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="icon">Icon</Label>
						<IconDropdown icon={icon} idOrHandler={setIcon} color={color} />
					</div>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label htmlFor="color">Color</Label>
						<ColorDropdown color={color} setColor={setColor} />
					</div>
				</div>

				<DialogFooter>
					<Button type="button" onClick={handleSave} disabled={!isValid}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
