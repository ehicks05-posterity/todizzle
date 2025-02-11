import { ProductCard } from './ProductCard';
import { PRODUCTS } from './constants';

export function Pricing() {
	return (
		<div className="grid gap-4">
			<div className="text-4xl font-bold">Plans</div>
			<div className="flex flex-col md:flex-row gap-2 lg:gap-4">
				{PRODUCTS.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
