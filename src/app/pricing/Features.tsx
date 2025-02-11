import { Check } from 'lucide-react';

export function Features({ features }: { features: string[] }) {
	return (
		<ul>
			{features.map((feature) => (
				<li className="flex items-center gap-2" key={feature}>
					<Check size={16} className="text-green-500 stroke-[3.5]" />
					{feature}
				</li>
			))}
		</ul>
	);
}
