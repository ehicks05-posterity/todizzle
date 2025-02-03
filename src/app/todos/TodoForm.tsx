import { db } from '@/components/lib/db';
import type { Status } from '@/components/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { id } from '@instantdb/react';
import { useState } from 'react';
import {
	DueDatePicker,
	PriorityDropdown,
	ProjectSelect,
	StatusDropdown,
} from './TodoInputs';

export interface TodoDefaults {
	projectId: string;
}

export const TodoForm = ({
	defaults,
	onSubmit,
}: { defaults?: TodoDefaults; onSubmit?: () => void }) => {
	const { data, isLoading } = db.useQuery({ projects: {} });
	const projects = data?.projects || [];

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState<string | undefined>(undefined);
	const [projectId, setProjectId] = useState(defaults?.projectId || '');
	const [status, setStatus] = useState<Status>('todo');
	const [priority, setPriority] = useState('none');

	if (isLoading) return null;

	const handleSave = async () => {
		const todoId = id();
		await db.transact(
			db.tx.todos[todoId].update({ title, description, dueDate, status }),
		);

		if (projectId) {
			await db.transact(db.tx.todos[todoId].link({ project: projectId }));
		}

		if (onSubmit) onSubmit();
	};

	const isValid = title.length !== 0;

	return (
		<div className="grid grid-cols-2 gap-4 py-4">
			<div className="grid col-span-2 w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="title">Title</Label>
				<Input
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="grid col-span-2 w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="description">Description</Label>
				<Input
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="dueDate">Due Date</Label>
				<DueDatePicker
					dueDate={dueDate}
					handleSelect={(date) => setDueDate(date?.toISOString())}
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="project">Project</Label>
				<ProjectSelect
					projects={projects}
					projectId={projectId}
					onChange={(v) => setProjectId(v)}
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="status">Status</Label>
				<StatusDropdown status={status} idOrHandler={setStatus} />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="status">Status</Label>
				<PriorityDropdown priority={priority} setPriority={setPriority} />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Button
					type="button"
					className="p-2 border border-black"
					onClick={handleSave}
					disabled={!isValid}
				>
					Save
				</Button>
			</div>
		</div>
	);
};
