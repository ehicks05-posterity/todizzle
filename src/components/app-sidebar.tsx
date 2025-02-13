import {
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	Loader2,
	UserCircle2,
} from 'lucide-react';
import type * as React from 'react';

import { InstantSignIn } from '@/InstantSignIn';
import { Usage } from '@/app/pricing/Usage';
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
						>
							<UserButton.UserProfilePage
								label="Usage"
								url="usage"
								labelIcon={<Loader2 size={16} />}
							>
								<Usage />
							</UserButton.UserProfilePage>
						</UserButton>
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
