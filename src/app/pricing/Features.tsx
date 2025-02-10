import { Check } from 'lucide-react';

export function Features({ features }: { features: string[] }) {
	return (
		<div>
			<div className="font-semibold text-sm text-muted-foreground">Features</div>
			<ul>
				{features.map((feature) => (
					<li className="flex items-center gap-2" key={feature}>
						<Check size={14} className="text-green-500 stroke-[4]" />
						{feature}
					</li>
				))}
			</ul>
		</div>
	);
}
