import { ProjectDialog } from '@/app/ProjectDialog';
import { THEMES } from '@/app/constants';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { ICONS } from '@/constants/icons';
import { Folder, Forward, MoreHorizontal, Trash2 } from 'lucide-react';
import { Link } from 'wouter';
import { db } from './lib/db';

export function NavProjects() {
	const { isMobile } = useSidebar();

	const { data, isLoading } = db.useQuery({ projects: { todos: {} } });

	if (isLoading) return null;

	const projects = data?.projects || [];

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects
					.map((project) => ({
						...project,
						icon: ICONS[project.icon as keyof typeof ICONS],
						color: THEMES[project.color as keyof typeof THEMES],
					}))
					.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link href={`/projects/${item.id}`}>
									<item.icon className={item.color.primary} />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction showOnHover>
										<MoreHorizontal />
										<span className="sr-only">More</span>
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-48 rounded-lg"
									side={isMobile ? 'bottom' : 'right'}
									align={isMobile ? 'end' : 'start'}
								>
									<DropdownMenuItem>
										<Folder className="text-muted-foreground" />
										<span>View Project</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Forward className="text-muted-foreground" />
										<span>Share Project</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Trash2 className="text-muted-foreground" />
										<span>Delete Project</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					))}
				<SidebarMenuItem>
					<Link href="/projects">
						<SidebarMenuButton className="text-sidebar-foreground/70">
							<MoreHorizontal className="text-sidebar-foreground/70" />
							More
						</SidebarMenuButton>
					</Link>
				</SidebarMenuItem>
				<ProjectDialog />
			</SidebarMenu>
		</SidebarGroup>
	);
}
