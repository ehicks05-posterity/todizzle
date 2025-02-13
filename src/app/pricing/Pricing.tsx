import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Usage } from './Usage';
import { FREE_TIER_ID, PRODUCTS } from './constants';
import { useActiveProductId } from './hooks';

export function Pricing() {
	const activeProductId = useActiveProductId();

	return (
		<div className="grid gap-4">
			<div className="text-4xl font-bold">Plans</div>
			<div className="grid gap-4 justify-start">
				{activeProductId !== FREE_TIER_ID && (
					<Alert>
						<Info />
						<AlertTitle>Making changes to your plan</AlertTitle>
						<AlertDescription>
							To make changes to your plan, click{' '}
							<span className="font-bold">Get Started!</span> on any of the plans
							below to visit the Stripe customer portal.
						</AlertDescription>
					</Alert>
				)}
				<div className="flex flex-col md:flex-row gap-2 lg:gap-4">
					{PRODUCTS.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
			<div className="bg-muted/50 rounded-lg p-4 max-w-xl">
				<Usage />
			</div>
		</div>
	);
}
