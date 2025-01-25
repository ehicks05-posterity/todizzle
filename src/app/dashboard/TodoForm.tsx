import { db } from '@/components/lib/db';
import { id } from '@instantdb/react';
import { useState } from 'react';
import type { Todo } from '../../components/lib/types';

export const TodoForm = ({ todo }: { todo?: Todo }) => {
	const { data: categories, isLoading } = db.useQuery({ categories: {} });

	const [title, setTitle] = useState(todo?.title || '');
	const [description, setDescription] = useState(todo?.description || '');
	const [dueDate, setDueDate] = useState(todo?.dueDate || '');
	const [categoryId, setCategoryId] = useState(todo?.category?.id || '');

	if (isLoading) return null;

	const handleSave = async () => {
		const todoId = todo?.id || id();
		await db.transact(db.tx.todos[todoId].update({ title, description, dueDate }));

		if (categoryId) {
			await db.transact(db.tx.todos[todoId].link({ category: categoryId }));
		} else {
			await db.transact(db.tx.todos[todoId].unlink({ category: categoryId }));
		}

		setTitle(todo?.title || '');
		setDescription(todo?.description || '');
		setDueDate(todo?.dueDate || '');
		setCategoryId(todo?.category?.id || '');
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				placeholder="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				placeholder="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				placeholder="due date"
				type="date"
				value={dueDate}
				onChange={(e) => setDueDate(e.target.value)}
			/>
			<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
				<option value="">none</option>
				{categories?.categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
			<button type="button" className="p-2 border border-black" onClick={handleSave}>
				{todo ? 'Update' : 'Add'} Todo
			</button>
		</div>
	);
};
