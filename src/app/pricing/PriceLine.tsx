import type { Price } from './constants';

export const currency = Intl.NumberFormat('en-US', {
	currency: 'usd',
	style: 'currency',
});

export function PriceLine({ price }: { price: Price }) {
	const amount = price.amount ? currency.format(price.amount / 100) : 'Free!';

	return (
		<div>
			<span className="text-xl font-semibold">{amount}</span>
			{price.freq && (
				<span className="text-sm text-muted-foreground">{price.freq}</span>
			)}
		</div>
	);
}
