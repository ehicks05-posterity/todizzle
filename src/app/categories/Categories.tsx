'use client';

import { Layout } from '@/app/Layout';
import { ICONS } from '@/app/dashboard/icons';
import { db } from '@/components/lib/db';
import type { Category } from '@/components/lib/types';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export const CategoryRow = ({ category }: { category: Category }) => {
	const Icon = ICONS[category.icon as keyof typeof ICONS];

	return (
		<Link href={`/categories/${category.id}`}>
			<div className="w-full flex justify-between items-center gap-2 p-2 hover:bg-muted rounded">
				<div className="flex items-center gap-2">
					<Icon size={16} />
					<div>{category.name}</div>
				</div>

				<Button
					variant="destructive"
					onClick={() => db.transact(db.tx.categories[category.id].delete())}
				>
					Delete
				</Button>
			</div>
		</Link>
	);
};

export function CategoryList() {
	const { data, isLoading } = db.useQuery({ categories: { todos: {} } });

	if (isLoading) return null;

	const categories = data?.categories || [];

	return (
		<Layout>
			<div>
				{categories.map((category) => (
					<CategoryRow key={category.id} category={category} />
				))}
			</div>
		</Layout>
	);
}
