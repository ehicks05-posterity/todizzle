import { db } from '@/components/lib/db';
import type { Project } from '@/components/lib/types';
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
import { id } from '@instantdb/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { IconDropdown } from './IconDropdown';

export function ProjectDialog({ project }: { project?: Project }) {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState(project?.name || '');
	const [icon, setIcon] = useState(project?.icon || 'circle');

	const handleSave = async () => {
		const projectId = project?.id || id();
		await db.transact(db.tx.projects[projectId].update({ name, icon }));
		setName(project?.name || '');
		setIcon(project?.icon || 'circle');
		setIsOpen(false);
	};

	const disableSave = name.length === 0;

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
					<DialogTitle>{project ? 'Edit' : 'Create'} project</DialogTitle>
					<DialogDescription>
						Add a new project here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="icon" className="text-right">
							Icon
						</Label>
						<IconDropdown icon={icon} setIcon={setIcon} />
					</div>
				</div>

				<DialogFooter>
					<Button
						type="button"
						className="p-2 border border-black"
						onClick={handleSave}
						disabled={disableSave}
					>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
