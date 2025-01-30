import { db } from '@/components/lib/db';
import type { Category } from '@/components/lib/types';
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
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { IconDropdown } from './IconDropdown';
import { TodoForm } from './dashboard/TodoForm';

export function TodoDialog({ category }: { category?: Category }) {
	const [isOpen, setIsOpen] = useState(false);
	// const [title, setTitle] = useState(todo?.title || '');

	// const handleSave = async () => {
	// 	const categoryId = category?.id || id();
	// 	await db.transact(db.tx.categories[categoryId].update({ name, icon }));
	// 	setName(category?.name || '');
	// 	setIcon(category?.icon || 'circle');
	// 	setIsOpen(false);
	// };

	// const disableSave = name.length === 0;

	return (
		<Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			<DialogTrigger onClick={() => setIsOpen(true)} asChild>
				<SidebarMenuButton variant="outline">
					<PlusCircle />
					Create Todo
				</SidebarMenuButton>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{category ? 'Edit' : 'Create'} todo</DialogTitle>
					<DialogDescription>
						Create a new todo here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<TodoForm />

				<DialogFooter>
					{/* <Button
						type="button"
						className="p-2 border border-black"
						onClick={handleSave}
						disabled={disableSave}
					>
						Save changes
					</Button> */}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
