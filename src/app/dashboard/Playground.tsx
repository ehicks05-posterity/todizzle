import { db } from '@/components/lib/db';
import { id } from '@instantdb/react';
import { useState } from 'react';
import { Link } from 'wouter';

const CategoryForm = () => {
	const [name, setName] = useState('');

	const handleAddCategory = () => {
		db.transact(db.tx.categories[id()].update({ name }));
		setName('');
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				value={name}
				placeholder="name"
				onChange={(e) => setName(e.target.value)}
			/>
			<button
				type="button"
				className="p-2 border border-black"
				onClick={handleAddCategory}
			>
				Add Category
			</button>
		</div>
	);
};

const TodoForm = () => {
	const { data: categories } = db.useQuery({ categories: {} });

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [categoryId, setCategoryId] = useState('');

	const handleAddTodo = async () => {
		const todoId = id();
		await db.transact(db.tx.todos[todoId].update({ title, description, dueDate }));

		if (categoryId) {
			await db.transact(db.tx.todos[todoId].link({ category: categoryId }));
		}

		setTitle('');
		setDescription('');
		setDueDate('');
		setCategoryId('');
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
			<button
				type="button"
				className="p-2 border border-black"
				onClick={handleAddTodo}
			>
				Add Todo
			</button>
		</div>
	);
};

export const Playground = () => {
	const { data: categories } = db.useQuery({ categories: {} });
	const { data: todos } = db.useQuery({ todos: { category: {} } });

	return (
		<>
			<div>
				<span className="text-xl">categories</span>
				{categories?.categories.map((category) => (
					<div key={category.id}>
						<pre className="text-sm">{JSON.stringify(category, null, 2)} </pre>
						<button
							type="button"
							className="p-2 border border-black"
							onClick={() => db.transact(db.tx.categories[category.id].delete())}
						>
							delete
						</button>
					</div>
				))}
				<CategoryForm />
			</div>
			<div>
				<span className="text-xl">todos</span>
				{todos?.todos.map((todo) => (
					<div key={todo.id}>
						<pre className="text-sm">{JSON.stringify(todo, null, 2)} </pre>
						<Link href={`/todos/${todo.id}`}>link</Link>
						<button
							type="button"
							className="p-2 border border-black"
							onClick={() => db.transact(db.tx.todos[todo.id].delete())}
						>
							delete
						</button>
					</div>
				))}
				<TodoForm />
			</div>
		</>
	);
};
