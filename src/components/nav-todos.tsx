'use client';

import { TodoDialog } from '@/app/TodoDialog';
import { SidebarGroup, SidebarMenu } from '@/components/ui/sidebar';

export function NavTodos() {
	return (
		<SidebarGroup>
			<SidebarMenu>
				<TodoDialog />
			</SidebarMenu>
		</SidebarGroup>
	);
}
