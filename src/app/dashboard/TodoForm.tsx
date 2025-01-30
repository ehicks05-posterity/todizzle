import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { id } from '@instantdb/react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import type { Todo } from '../../components/lib/types';
import { STATUSES } from '../constants';

const StatusDropdown = ({
	status: statusName,
	setStatus,
}: {
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const status = STATUSES[statusName as keyof typeof STATUSES];
	const Icon = status.icon;

	const OPTIONS = Object.entries(STATUSES).map(([name, status]) => (
		<DropdownMenuItem key={name} onClick={() => setStatus(name)}>
			<span className="flex items-center gap-1">
				<status.icon size={18} className={status.color} />
				{status.label}
			</span>
		</DropdownMenuItem>
	));

	return (
		<DropdownMenu>
			<span>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex items-center gap-1">
						<Icon size={18} className={status.color} /> {status.label}
					</Button>
				</DropdownMenuTrigger>
			</span>
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

export const TodoForm = ({ todo }: { todo?: Todo }) => {
	const { data: categories, isLoading } = db.useQuery({ categories: {} });

	const [title, setTitle] = useState(todo?.title || '');
	const [description, setDescription] = useState(todo?.description || '');
	const [dueDate, setDueDate] = useState(todo?.dueDate || '');
	const [categoryId, setCategoryId] = useState(todo?.category?.id || '');
	const [status, setStatus] = useState(todo?.status || 'backlog');

	if (isLoading) return null;

	const handleSave = async () => {
		const todoId = todo?.id || id();
		await db.transact(
			db.tx.todos[todoId].update({ title, description, dueDate, status }),
		);

		if (categoryId) {
			await db.transact(db.tx.todos[todoId].link({ category: categoryId }));
		} else {
			await db.transact(db.tx.todos[todoId].unlink({ category: categoryId }));
		}

		if (!todo) {
			setTitle('');
			setDescription('');
			setDueDate('');
			setCategoryId('');
			setStatus('backlog');
		}
	};

	const isValid = title.length !== 0;

	return (
		<div className="grid gap-4 py-4">
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="title">Title</Label>
				<Input
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="description">Description</Label>
				<Input
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="dueDate">Due Date</Label>
				<Input
					name="dueDate"
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="category">Category</Label>
				<Select
					name="category"
					value={categoryId}
					onValueChange={(v) => setCategoryId(v)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a category..." />
					</SelectTrigger>
					<SelectContent>
						{categories?.categories.map((category) => (
							<SelectItem key={category.id} value={category.id}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="status">Status</Label>
				<StatusDropdown status={status} setStatus={setStatus} />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Button
					type="button"
					className="p-2 border border-black"
					onClick={handleSave}
					disabled={!isValid}
				>
					Save changes
				</Button>
			</div>
			{todo && (
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<DeleteTodoButton todo={todo} />
				</div>
			)}
		</div>
	);
};
