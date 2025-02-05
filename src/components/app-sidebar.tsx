import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	GalleryVerticalEnd,
	SquareTerminal,
	UserCircle2,
} from 'lucide-react';
import type * as React from 'react';

import { InstantSignIn } from '@/InstantSignIn';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { TeamSwitcher } from '@/components/team-switcher';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from '@/components/ui/sidebar';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { NavSettings } from './nav-settings';
import { NavTodos } from './nav-todos';

// This is sample data.
const data = {
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#',
				},
				{
					title: 'Starred',
					url: '#',
				},
				{
					title: 'Settings',
					url: '#',
				},
			],
		},
		{
			title: 'Models',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#',
				},
				{
					title: 'Explorer',
					url: '#',
				},
				{
					title: 'Quantum',
					url: '#',
				},
			],
		},
		{
			title: 'Documentation',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#',
				},
				{
					title: 'Get Started',
					url: '#',
				},
				{
					title: 'Tutorials',
					url: '#',
				},
				{
					title: 'Changelog',
					url: '#',
				},
			],
		},
	],
};

export function AppSidebar({
	isOpen,
	...props
}: React.ComponentProps<typeof Sidebar> & { isOpen: boolean }) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavTodos />
				<NavProjects />
				<NavMain items={data.navMain} />
				<NavSettings />
			</SidebarContent>
			<SidebarFooter>
				<InstantSignIn />
				<SignedIn>
					<div className="w-full hover:bg-sidebar-accent">
						<UserButton
							showName={isOpen}
							appearance={{
								elements: {
									userButtonTrigger: {
										padding: isOpen ? '.5rem' : '',
										width: isOpen ? '240px' : '',
									},
								},
							}}
						/>
					</div>
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal">
						<SidebarMenuButton size="lg">
							<div className="w-full flex items-center justify-center gap-2">
								{isOpen && (
									<span className="truncate text-sm font-bold">Sign In</span>
								)}
								<UserCircle2 className="h-6 w-6 rounded-lg" />
							</div>
						</SidebarMenuButton>
					</SignInButton>
				</SignedOut>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
