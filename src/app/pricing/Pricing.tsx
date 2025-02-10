import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { useAuth } from '@clerk/clerk-react';
import { Check } from 'lucide-react';
import { z } from 'zod';
import { PRODUCTS, type Price, type Product } from './constants';

function PriceLine({ price }: { price: Price }) {
	const amount = price.amount
		? Intl.NumberFormat('en-US', {
				currency: 'usd',
				style: 'currency',
			}).format(price.amount / 100)
		: 'Free!';
	return (
		<div>
			<span className="font-semibold">{amount}</span>
			{price.freq && (
				<span className="text-sm text-muted-foreground">{price.freq}</span>
			)}
		</div>
	);
}

function ProductCard({ product }: { product: Product }) {
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
				<product.icon className="group-hover:animate-bounce" />
				<div className="text-4xl font-bold text-blue-500 mix">{product.name}</div>
				<PriceLine price={product.price} />
			</div>

			<div>
				<div className="font-semibold text-sm text-muted-foreground">Features</div>
				<ul>
					{product.features.map((feature) => (
						<li className="flex items-center gap-2" key={feature}>
							<Check size={14} className="text-green-500 stroke-[4]" />
							{feature}
						</li>
					))}
				</ul>
			</div>

			<Button disabled={isCurrentPlan} onClick={handleClick}>
				{isCurrentPlan ? 'Current Plan' : 'Get Started!'}
			</Button>
		</div>
	);
}

export function Pricing() {
	return (
		<div className="grid gap-4">
			<div className="text-4xl font-bold">Plans</div>
			<div className="flex flex-col md:flex-row gap-2 lg:gap-8">
				{PRODUCTS.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
