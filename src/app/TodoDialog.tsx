import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';
import { useLocation } from 'wouter';
import { parseLocation } from './Layout';
import { TodoForm } from './todos/TodoForm';

export function TodoDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const [location] = useLocation();
	const { resource, resourceId } = parseLocation(location);

	useHotkeys('c', (e) => {
		e.preventDefault();
		setIsOpen((isOpen) => !isOpen);
	});

	const defaults =
		resource === 'projects' && resourceId ? { projectId: resourceId } : undefined;

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
					<DialogTitle>Create todo</DialogTitle>
					<DialogDescription>
						Create a new todo here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>

				<TodoForm defaults={defaults} onSubmit={() => setIsOpen(false)} />

				{/* <DialogFooter></DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
}
