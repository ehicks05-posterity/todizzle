import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { id } from '@instantdb/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import type { Todo } from '../../components/lib/types';
import { PRIORITIES, STATUSES } from '../constants';

export const StatusDropdown = ({
	status: statusName,
	setStatus,
}: {
	status: string;
	setStatus: (status: string) => void;
}) => {
	const status = STATUSES[statusName as keyof typeof STATUSES];
	const Icon = status.icon;

	const OPTIONS = Object.entries(STATUSES).map(([name, status]) => (
		<DropdownMenuItem key={name} onClick={() => setStatus(name)}>
			<span className="flex items-center gap-2">
				<status.icon size={18} className={status.color} />
				{status.label}
			</span>
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center gap-2 justify-start">
					<Icon size={18} className={status.color} /> {status.label}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const DueDatePicker = ({
	dueDate,
	handleSelect,
}: { dueDate?: string | number; handleSelect: (date?: Date) => void }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'ghost'}
					className={cn(
						'justify-start text-left font-normal',
						!dueDate && 'text-muted-foreground',
					)}
				>
					<CalendarIcon className="mr-1 h-4 w-4" />
					{dueDate ? (
						`Due ${format(new Date(String(dueDate)), 'PP')}`
					) : (
						<span>Set a due date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={dueDate ? new Date(dueDate) : undefined}
					onSelect={handleSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export const PriorityDropdown = ({
	priority: priorityName,
	setPriority,
}: {
	priority?: string;
	setPriority: (priority?: string) => void;
}) => {
	const priority =
		PRIORITIES[priorityName as keyof typeof PRIORITIES] || PRIORITIES.none;
	const label = !priorityName ? 'Priority' : priority.label;
	const color = !priorityName
		? 'text-neutral-500 dark:text-neutral-400'
		: priority.color;

	const OPTIONS = Object.entries(PRIORITIES).map(([name, priority]) => (
		<DropdownMenuItem
			key={name}
			onClick={() => setPriority(name === 'none' ? undefined : name)}
		>
			<span className="flex items-center gap-2">
				<priority.icon size={18} className={priority.color} />
				{priority.label}
			</span>
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center gap-2 justify-start">
					<priority.icon size={18} className={color} />
					<span className={!priorityName ? color : ''}>{label}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const ProjectSelect = ({
	projectId,
	onChange,
}: { projectId?: string; onChange: (projectId: string) => void }) => {
	const { data: projects, isLoading } = db.useQuery({ projects: {} });
	if (isLoading) return null;

	return (
		<Select
			name="project"
			value={projectId || 'no_project'}
			onValueChange={(v) => onChange(v)}
		>
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={'no_project'}>No project</SelectItem>

				{projects?.projects.map((project) => (
					<SelectItem key={project.id} value={project.id}>
						{project.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export const DeleteTodoButton = ({ todo }: { todo: Todo }) => {
	const [, navigate] = useLocation();

	const handleDelete = async () => {
		db.transact(db.tx.todos[todo.id].delete());
		navigate('/');
	};

	return (
		<Button
			type="button"
			variant="destructive"
			className="p-2 border border-black"
			onClick={handleDelete}
		>
			Delete
		</Button>
	);
};

export const TodoForm = ({ onSubmit }: { onSubmit?: () => void }) => {
	const { data: projects, isLoading } = db.useQuery({ projects: {} });

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState<string | undefined>(undefined);
	const [projectId, setProjectId] = useState('');
	const [status, setStatus] = useState('todo');
	const [priority, setPriority] = useState<string | undefined>(undefined);

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
				<ProjectSelect projectId={projectId} onChange={(v) => setProjectId(v)} />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="status">Status</Label>
				<StatusDropdown status={status} setStatus={setStatus} />
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
					Create todo
				</Button>
			</div>
		</div>
	);
};
