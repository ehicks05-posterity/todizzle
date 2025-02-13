import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { PRODUCTS } from './constants';
import { useActiveProductId } from './hooks';

const percent = Intl.NumberFormat('en-US', { style: 'percent' });

export function useUsage() {
	const { data } = db.useQuery({ projects: {}, todos: {} });

	const activeProductId = useActiveProductId();
	const productLimits = PRODUCTS.find(
		(product) => product.id === activeProductId,
	)?.limits;

	const usage = [
		{
			label: 'Projects',
			used: data?.projects.length || 0,
			limit:
				productLimits?.find((productLimit) => productLimit.resource === 'projects')
					?.amount || Number.POSITIVE_INFINITY,
		},
		{
			label: 'Todos',
			used: data?.todos.length || 0,
			limit:
				productLimits?.find(
					(productLimit) => productLimit.resource === 'activeTodos',
				)?.amount || Number.POSITIVE_INFINITY,
		},
	].map((usage) => ({
		...usage,
		asFraction: `${usage.used}/${usage.limit}`,
		asPercent: percent.format(usage.used / usage.limit),
		asPercentRaw: 100 * (usage.used / usage.limit),
	}));

	return usage;
}

export function Usage() {
	const usage = useUsage();

	return (
		<div className="grid gap-4">
			<div className="text-[17px] font-[700]">Usage</div>
			<div className="grid gap-4 justify-start">
				<div className="flex flex-col gap-2 lg:gap-4">
					{usage.map((usage, i) => (
						<>
							{i !== 0 && <Separator className="bg-white/7" />}
							<div key={usage.label} className="flex flex-col gap-2 min-w-64">
								<div className="flex justify-between items-baseline">
									<div className="font-medium text-sm">{usage.label}</div>
									<span>{usage.asFraction}</span>
								</div>
								<div className="flex flex-col items-end">
									<Progress value={usage.asPercentRaw} />
									<div className="flex gap-4 justify-between">
										<span>{usage.asPercent}</span>
									</div>
								</div>
							</div>
						</>
					))}
				</div>
			</div>
		</div>
	);
}
