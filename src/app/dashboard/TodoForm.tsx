import { db } from '@/components/lib/db';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { id } from '@instantdb/react';
import { useState } from 'react';
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
				<DropdownMenuTrigger>
					<Button variant="outline" className="flex items-center gap-1">
						<Icon size={18} className={status.color} /> {status.label}
					</Button>
				</DropdownMenuTrigger>
			</span>
			<DropdownMenuContent>{OPTIONS}</DropdownMenuContent>
		</DropdownMenu>
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

	return (
		<div className="flex flex-col gap-2">
			<Input
				placeholder="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Input
				placeholder="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Input
				placeholder="due date"
				type="date"
				value={dueDate}
				onChange={(e) => setDueDate(e.target.value)}
			/>
			<Select value={categoryId} onValueChange={(v) => setCategoryId(v)}>
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
			<StatusDropdown status={status} setStatus={setStatus} />
			<Button type="button" className="p-2 border border-black" onClick={handleSave}>
				{todo ? 'Update' : 'Add'} Todo
			</Button>
		</div>
	);
};
