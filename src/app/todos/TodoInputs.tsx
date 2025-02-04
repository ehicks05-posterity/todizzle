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
import { ICONS } from '@/constants/icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import type { Priority, Status, Todo } from '../../components/lib/types';
import { PRIORITIES, STATUSES, THEMES } from '../constants';

export const StatusDropdown = ({
	status,
	variant = 'default',
	idOrHandler,
}: {
	status: Status;
	variant?: 'default' | 'icon';
	idOrHandler: string | ((status: Status) => void);
}) => {
	const statusMeta = STATUSES[status];

	const handleClick =
		typeof idOrHandler === 'string'
			? (status: Status) => db.transact(db.tx.todos[idOrHandler].update({ status }))
			: idOrHandler;

	const OPTIONS = Object.values(STATUSES).map((status) => (
		<DropdownMenuItem
			key={status.name}
			onClick={(e) => {
				e.stopPropagation();
				handleClick(status.name);
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
					className={`flex items-center gap-2 ${variant === 'icon' ? 'justify-center' : 'justify-start'}`}
				>
					<statusMeta.icon size={18} className={statusMeta.color} />
					{variant === 'default' && statusMeta.label}
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
	priority,
	variant = 'default',
	idOrHandler,
}: {
	priority: Priority;
	variant?: 'default' | 'icon';
	idOrHandler: string | ((priority: Priority) => void);
}) => {
	const priorityMeta = PRIORITIES[priority];
	const color =
		priority === 'none'
			? 'text-neutral-500 dark:text-neutral-400'
			: priorityMeta.color;

	const handleClick =
		typeof idOrHandler === 'string'
			? (priority: Priority) =>
					db.transact(db.tx.todos[idOrHandler].update({ priority }))
			: idOrHandler;

	const OPTIONS = Object.values(PRIORITIES).map((priority) => (
		<DropdownMenuItem
			key={priority.name}
			onClick={(e) => {
				e.stopPropagation();
				handleClick(priority.name);
			}}
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
				<Button
					variant="ghost"
					size={variant === 'icon' ? 'icon' : undefined}
					className={`flex items-center gap-2 ${variant === 'icon' ? 'justify-center' : 'justify-start'}`}
				>
					<priorityMeta.icon size={18} className={color} />
					{variant === 'default' && (
						<span className={priority === 'none' ? color : ''}>
							{priority === 'none' ? 'Priority' : priorityMeta.label}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const ProjectDropdown = ({
	projectId,
	idOrHandler,
}: {
	projectId?: string;
	idOrHandler: string | ((projectId: string) => void);
}) => {
	const { data } = db.useQuery({ projects: {} });
	const projects = data?.projects || [];
	const project = projects.find((p) => p.id === projectId);
	const Icon = project ? ICONS[project.icon as keyof typeof ICONS] : ICONS.scan;
	const theme = project ? THEMES[project.color as keyof typeof THEMES] : THEMES.blue;

	const handleClick =
		typeof idOrHandler === 'string'
			? (id: string) =>
					id === projectId
						? db.transact(db.tx.todos[idOrHandler].unlink({ project: id }))
						: db.transact(db.tx.todos[idOrHandler].link({ project: id }))
			: idOrHandler;

	const OPTIONS = projects.map((project) => {
		const Icon = ICONS[project.icon as keyof typeof ICONS];
		const theme = THEMES[project.color as keyof typeof THEMES];

		return (
			<DropdownMenuItem
				key={project.id}
				onClick={(e) => {
					e.stopPropagation();
					handleClick(project.id);
				}}
			>
				<span className="flex items-center gap-2">
					<Icon size={18} className={theme.primary} />
					{project.title}
				</span>
			</DropdownMenuItem>
		);
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center gap-2 justify-start">
					{Icon && <Icon size={18} className={theme.primary} />}
					{project?.title || 'Add to project'}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
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
