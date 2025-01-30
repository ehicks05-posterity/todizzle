'use client';

import { ChevronRight, LucideCircle } from 'lucide-react';

import { CategoryDialog } from '@/app/CategoryDialog';
import { ICONS } from '@/app/dashboard/icons';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from 'wouter';
import { db } from './lib/db';
import { TodoDialog } from '@/app/TodoDialog';

export function NavCategories() {
	const { data, isLoading } = db.useQuery({ categories: { todos: {} } });

	if (isLoading) return null;

	const categories = data?.categories || [];

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Categories</SidebarGroupLabel>
			<SidebarMenu>
				{categories
					.map((category) => ({
						...category,
						icon: ICONS[category.icon as keyof typeof ICONS],
					}))
					.map((category) => (
						<Collapsible
							key={category.name}
							asChild
							defaultOpen={true}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton tooltip={category.name}>
										{category.icon ? <category.icon /> : <LucideCircle />}
										<span>{category.name}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										{category.todos?.map((todo) => (
											<SidebarMenuSubItem key={todo.id}>
												<SidebarMenuSubButton asChild>
													<Link href={`/todos/${todo.id}`}>
														<span>{todo.title}</span>
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					))}
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/categories">Manage Categories</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<CategoryDialog />
				<TodoDialog />
			</SidebarMenu>
		</SidebarGroup>
	);
}
