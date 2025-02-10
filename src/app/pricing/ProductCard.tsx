import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Features } from './Features';
import { PriceLine } from './PriceLine';
import type { Product } from './constants';

export function ProductCard({ product }: { product: Product }) {
	const { user } = db.useAuth();

	const handleClick = async () => {
		if (!user) return;

		try {
			const result = await fetch(
				// 'https://api.todizzle.com/payments/create-checkout-session',
				'http://localhost:8000/payments/test',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						authorization: user.refresh_token,
					},
					body: JSON.stringify({
						lineItems: [{ price: product.price.id, quantity: 1 }],
					}),
				},
			);
			const json = await result.json();

			const schema = z.object({ checkoutSessionUrl: z.string() });
			const { checkoutSessionUrl } = schema.parse(json);

			window.location.href = checkoutSessionUrl;
		} catch (e) {
			alert('Unable to generate a checkout session');
		}
	};

	// TODO: add to db
	const CURRENT_PRODUCT = 'free';
	const isCurrentPlan = product.id === CURRENT_PRODUCT;

	return (
		<div className="group flex flex-col gap-12 p-4 lg:p-8 border rounded-lg">
			<div>
				<product.icon className={cn('group-hover:animate-bounce', product.color)} />
				<div className="text-4xl font-bold text-blue-500 mix">{product.name}</div>
				<PriceLine price={product.price} />
			</div>

			<Features features={product.features} />

			<Button disabled={isCurrentPlan} onClick={handleClick}>
				{isCurrentPlan ? 'Current Plan' : 'Get Started!'}
			</Button>
		</div>
	);
}
