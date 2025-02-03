import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import type { Project, Todo } from '../../components/lib/types';
import { PRIORITIES, STATUSES } from '../constants';

export const StatusDropdown = ({
	status: statusName,
	variant = 'default',
	idOrHandler,
}: {
	status: string;
	variant?: 'default' | 'icon';
	idOrHandler: string | ((status: string) => void);
}) => {
	const status = STATUSES[statusName as keyof typeof STATUSES];

	const handleClick =
		typeof idOrHandler === 'string'
			? (status: string) => db.transact(db.tx.todos[idOrHandler].update({ status }))
			: idOrHandler;

	const OPTIONS = Object.entries(STATUSES).map(([name, status]) => (
		<DropdownMenuItem
			key={name}
			onClick={(e) => {
				e.preventDefault();
				handleClick(name);
			}}
		>
			<span className="flex items-center gap-2">
				<status.icon size={18} className={status.color} />
				{status.label}
			</span>
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size={variant === 'icon' ? 'icon' : undefined}
					className="flex items-center gap-2 justify-center"
				>
					<status.icon size={18} className={status.color} />
					{variant === 'default' && status.label}
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
	priority: string;
	setPriority: (priority: string) => void;
}) => {
	const priority = PRIORITIES[priorityName];
	const label = priorityName === 'none' ? 'Priority' : priority.label;
	const color =
		priorityName === 'none'
			? 'text-neutral-500 dark:text-neutral-400'
			: priority.color;

	const OPTIONS = Object.entries(PRIORITIES).map(([name, priority]) => (
		<DropdownMenuItem key={name} onClick={() => setPriority(name)}>
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
					<span className={priorityName === 'none' ? color : ''}>{label}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const ProjectSelect = ({
	projects,
	projectId,
	onChange,
}: {
	projects: Project[];
	projectId?: string;
	onChange: (projectId: string) => void;
}) => {
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

				{projects.map((project) => (
					<SelectItem key={project.id} value={project.id}>
						{project.title}
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
