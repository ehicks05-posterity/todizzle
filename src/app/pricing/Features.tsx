import { Check } from 'lucide-react';
import { RESOURCES, type ResourceLimit } from './constants';

export function Features({ limits }: { limits: ResourceLimit[] }) {
	return (
		<ul className="grid gap-2">
			{limits.map((limit) => (
				<li className="flex items-center gap-2" key={limit.resource}>
					<Check size={16} className="text-green-500 stroke-[3.5]" />
					Up to {limit.amount} {RESOURCES[limit.resource].label}
				</li>
			))}
		</ul>
	);
}
