import { Button } from '@/components/ui/button';
import { API_URL, STRIPE_CUSTOMER_PORTAL_LINK } from '@/constants/app';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Features } from './Features';
import { PriceLine } from './PriceLine';
import type { Product } from './constants';
import { useActiveProduct } from './hooks';

const CREATE_CHECKOUT_URL = `${API_URL}/payments/create-checkout-session`;

interface Params {
	token: string;
	priceId: string;
}

const createCheckoutSession = async ({ token, priceId }: Params) => {
	const result = await fetch(CREATE_CHECKOUT_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: token },
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
	const activeProduct = useActiveProduct();
	if (!user) return null;

	const handleClick = () => {
		if (activeProduct?.isPayingUser) {
			window.location.href = STRIPE_CUSTOMER_PORTAL_LINK;
		} else {
			checkOut({ token: user.refresh_token, priceId: product.price.id });
		}
	};

	const isCurrentPlan = product.id === activeProduct?.productId;

	return (
		<div className="group flex flex-col gap-12 p-4 lg:p-8 border rounded-lg bg-muted/50">
			<div className="grid gap-4">
				<div className="flex gap-2 justify-between items-end">
					<div className="font-bold text-blue-500 dark:text-blue-400">
						{product.name}
					</div>
					<product.icon
						className={cn('group-hover:animate-bounce', product.color)}
					/>
				</div>
				<PriceLine price={product.price} />
			</div>

			<Features limits={product.limits} />

			<Button disabled={isCurrentPlan} onClick={handleClick}>
				{isCurrentPlan ? 'Current Plan' : 'Get Started!'}
			</Button>
		</div>
	);
}
