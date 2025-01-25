import { db } from '@/components/lib/db';
import { id } from '@instantdb/react';
import { useState } from 'react';
import type { Category } from '../../components/lib/types';

export const CategoryForm = ({ category }: { category?: Category }) => {
	const [name, setName] = useState(category?.name || '');

	const handleSave = () => {
		db.transact(db.tx.categories[id()].update({ name }));
		setName(category?.name || '');
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				value={name}
				placeholder="name"
				onChange={(e) => setName(e.target.value)}
			/>
			<button type="button" className="p-2 border border-black" onClick={handleSave}>
				{category ? 'Update' : 'Add'} Category
			</button>
		</div>
	);
};
