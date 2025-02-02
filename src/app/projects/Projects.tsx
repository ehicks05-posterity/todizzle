'use client';

import { Layout } from '@/app/Layout';
import { ICONS } from '@/app/constants';
import { db } from '@/components/lib/db';
import type { Project } from '@/components/lib/types';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export const ProjectRow = ({ project }: { project: Project }) => {
	const Icon = ICONS[project.icon as keyof typeof ICONS];

	return (
		<Link href={`/projects/${project.id}`}>
			<div className="w-full flex justify-between items-center gap-2 p-2 hover:bg-muted rounded">
				<div className="flex items-center gap-2">
					<Icon size={16} />
					<div>{project.title}</div>
				</div>

				<Button
					variant="destructive"
					onClick={() => db.transact(db.tx.projects[project.id].delete())}
				>
					Delete
				</Button>
			</div>
		</Link>
	);
};

export function ProjectList() {
	const { data, isLoading } = db.useQuery({ projects: { todos: {} } });

	if (isLoading) return null;

	const projects = data?.projects || [];

	return (
		<Layout>
			<div>
				{projects.map((project) => (
					<ProjectRow key={project.id} project={project} />
				))}
			</div>
		</Layout>
	);
}
