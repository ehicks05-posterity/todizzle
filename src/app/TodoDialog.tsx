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
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { type TodoDefaults, TodoForm } from './todos/TodoForm';

export function TodoDialog({ defaults }: { defaults?: TodoDefaults }) {
	const [isOpen, setIsOpen] = useState(false);

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
