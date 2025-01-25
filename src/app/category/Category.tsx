import { db } from '@/components/lib/db';
import { Layout } from '../Layout';
import { CategoryForm } from '../dashboard/CategoryForm';

export function Category({ id }: { id: string }) {
	const { data } = db.useQuery({ categories: { $: { where: { id } }, todos: {} } });

	const category = data?.categories[0];
	if (!category) return null;

	return (
		<Layout>
			<pre className="text-sm">{JSON.stringify(category, null, 2)} </pre>
			<button
				type="button"
				className="p-2 border border-black"
				onClick={() => db.transact(db.tx.categories[category.id].delete())}
			>
				delete
			</button>

			<div className="h-32" />
			<CategoryForm category={category} />
		</Layout>
	);
}
