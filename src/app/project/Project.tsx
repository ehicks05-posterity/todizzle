import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import { Layout } from '../Layout';
import { ProjectForm } from '../todos/ProjectForm';

export function Project({ id }: { id: string }) {
	const { data } = db.useQuery({ projects: { $: { where: { id } }, todos: {} } });

	const project = data?.projects[0];
	if (!project) return null;

	return (
		<Layout>
			<pre className="text-sm">{JSON.stringify(project, null, 2)} </pre>
			<Button
				type="button"
				className="p-2 border border-black"
				onClick={() => db.transact(db.tx.projects[project.id].delete())}
			>
				delete
			</Button>

			<div className="h-32" />
			<ProjectForm project={project} />
		</Layout>
	);
}
