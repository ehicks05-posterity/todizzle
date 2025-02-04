import { db } from '@/components/lib/db';
import type { Project } from '@/components/lib/types';
import { Link } from 'wouter';
import { DeleteProjectButton, IconDropdown } from '../project/ProjectInputs';

export const ProjectRow = ({ project }: { project: Project }) => {
	return (
		<Link href={`/projects/${project.id}`}>
			<div className="w-full flex justify-between items-center gap-2 p-2 hover:bg-muted rounded">
				<div className="flex items-center gap-2">
					<IconDropdown
						icon={project.icon}
						color={project.color}
						idOrHandler={project.id}
					/>
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
