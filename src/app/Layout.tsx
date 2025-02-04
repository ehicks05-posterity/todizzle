import { AppSidebar } from '@/components/app-sidebar';
import { db } from '@/components/lib/db';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { useState, type ReactNode } from 'react';
import { useLocation } from 'wouter';

export const parseLocation = (
	location: string,
): { resource?: 'todos' | 'projects'; resourceId?: string } => {
	const resource = location.startsWith('/todos/')
		? 'todos'
		: location.startsWith('/projects/')
			? 'projects'
			: undefined;

	const resourceId = resource
		? location.slice(location.lastIndexOf('/') + 1)
		: undefined;

	return { resource, resourceId };
};

// hacky. display todo title or project name in breadcrumb.
export const useEntityLabel = (location: string) => {
	const { resource, resourceId } = parseLocation(location);

	const query =
		resource && resourceId
			? {
					todos: {
						$: { where: { id: resource === 'todos' ? resourceId : '' } },
					},
					projects: {
						$: { where: { id: resource === 'projects' ? resourceId : '' } },
					},
				}
			: null;

	const { data, isLoading } = db.useQuery(query);

	const todo = data?.todos?.[0];
	const project = data?.projects?.[0];
	const entityLabel = todo ? todo.title : project ? project.title : undefined;
	return { entityLabel, isLoading };
};

export function Breadcrumbs() {
	const [location] = useLocation();

	const { entityLabel } = useEntityLabel(location);

	const parts = location.split('/').filter(Boolean);

	const paths = parts.map((part, i) => {
		const isTerminal = i === parts.length - 1;
		const label =
			isTerminal && entityLabel
				? entityLabel
				: part[0].toLocaleUpperCase() + part.slice(1);
		return {
			label,
			path: `/${parts.slice(0, i + 1).join('/')}`,
			isTerminal,
		};
	});

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{/* <BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem> */}
				{paths.map((path, i) => (
					<div className="flex gap-2 items-center" key={path.path}>
						{i !== 0 && <BreadcrumbSeparator className="block" />}
						<BreadcrumbItem>
							{path.isTerminal ? (
								<BreadcrumbPage>{path.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={path.path}>{path.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</div>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export function Layout({ children }: { children: ReactNode }) {
	const [location] = useLocation();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<SidebarProvider open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			<AppSidebar isOpen={isOpen} />
			<SidebarInset key={location}>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4 w-full">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumbs />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
