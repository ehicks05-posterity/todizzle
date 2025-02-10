import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Features } from './Features';
import { PriceLine } from './PriceLine';
import type { Product } from './constants';

// const CREATE_CHECKOUT_URL = 'https://api.todizzle.com/payments/create-checkout-session';
const CREATE_CHECKOUT_URL = 'http://localhost:8000/payments/test';

interface Params {
	token: string;
	priceId: string;
}

const createCheckoutSession = async ({ token, priceId }: Params) => {
	const result = await fetch(CREATE_CHECKOUT_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', authorization: token },
		body: JSON.stringify({ priceId }),
	});
	return result.json();
};

const checkOut = async ({ token, priceId }: Params) => {
	try {
		const json = await createCheckoutSession({ token, priceId });
		const schema = z.object({ checkoutSessionUrl: z.string() });
		const { checkoutSessionUrl } = schema.parse(json);
		window.location.href = checkoutSessionUrl;
	} catch (e) {
		alert('Unable to generate a checkout session');
	}
};

export function ProductCard({ product }: { product: Product }) {
	const { user } = db.useAuth();

	const handleClick = user
		? async () => checkOut({ token: user.refresh_token, priceId: product.price.id })
		: undefined;

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
