'use client';

import { TodoDialog } from '@/app/TodoDialog';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ListCheck } from 'lucide-react';
import { Link } from 'wouter';

export function NavTodos() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Todos</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuButton asChild>
					<Link href="/todos/">
						<ListCheck />
						My Todos
					</Link>
				</SidebarMenuButton>

				<TodoDialog />
			</SidebarMenu>
		</SidebarGroup>
	);
}
