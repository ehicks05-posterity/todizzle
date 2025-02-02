import { ICONS } from '@/app/constants';
import { db } from '@/components/lib/db';
import type { Project } from '@/components/lib/types';
import { Link } from 'wouter';
import { DeleteProjectButton } from '../project/ProjectInputs';

export const ProjectRow = ({ project }: { project: Project }) => {
	const Icon = ICONS[project.icon as keyof typeof ICONS];

	return (
		<Link href={`/projects/${project.id}`}>
			<div className="w-full flex justify-between items-center gap-2 p-2 hover:bg-muted rounded">
				<div className="flex items-center gap-2">
					<Icon size={16} />
					<div>{project.title}</div>
				</div>

				<DeleteProjectButton id={project.id} />
			</div>
		</Link>
	);
};

export function ProjectList() {
	const { data } = db.useQuery({ projects: { todos: {} } });
	const projects = data?.projects || [];

	return (
		<div>
			{projects.map((project) => (
				<ProjectRow key={project.id} project={project} />
			))}
		</div>
	);
}
