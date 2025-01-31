import { AppSidebar } from '@/components/app-sidebar';
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
import type { ReactNode } from 'react';
import { useLocation } from 'wouter';

export function Breadcrumbs() {
	const [location] = useLocation();

	const parts = location.split('/').filter(Boolean);

	const paths = parts.map((part, i) => {
		return {
			label: part,
			path: `/${parts.slice(0, i + 1).join('/')}`,
			isTerminal: i === parts.length - 1,
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
						{i !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
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
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
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
