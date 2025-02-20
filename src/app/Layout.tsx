import { AppSidebar } from '@/components/sidebar/app-sidebar';
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
import { db } from '@/lib/db';
import { type ReactNode, useState } from 'react';
import { useLocation, useRoute } from 'wouter';

export const useParseLocation = () => {
	const projectRoute = useRoute('/projects/:projectId');
	const todoRoute = useRoute('/todos/:todoId');
	const projectTodoRoute = useRoute('/projects/:projectId/todos/:todoId');

	const defaults = { projectId: undefined, todoId: undefined };

	const match = {
		...defaults,
		...projectRoute[1],
		...todoRoute[1],
		...projectTodoRoute[1],
	};

	return match;
};

// hacky. display todo title or project name in breadcrumb.
export const useEntityLabel = () => {
	const { projectId, todoId } = useParseLocation();

	const { data, isLoading } =
		projectId || todoId
			? db.useQuery({
					todos: { $: { where: { id: todoId || '' } } },
					projects: { $: { where: { id: projectId || '' } } },
				})
			: { data: null, isLoading: false };

	const todo = data?.todos?.[0];
	const project = data?.projects?.[0];
	return { isLoading, todo, project };
};

export function Breadcrumbs() {
	const [location] = useLocation();

	const { todo, project, isLoading } = useEntityLabel();
	if (isLoading) return null;

	const parts = location.split('/').filter(Boolean);

	const paths = parts.map((part, i) => {
		const previous = i > 0 ? parts[i - 1] : undefined;
		const isTerminal = i === parts.length - 1;
		const isEntity = previous && ['todos', 'projects'].includes(previous);
		const entityLabel =
			isEntity && previous === 'todos'
				? todo?.title
				: isEntity && previous === 'projects'
					? project?.title
					: undefined;

		const label = entityLabel
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
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
