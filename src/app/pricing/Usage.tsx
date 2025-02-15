import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { Fragment } from 'react';
import { useActiveProduct } from './hooks';

const percent = Intl.NumberFormat('en-US', { style: 'percent' });

export function useUsage() {
	const { data } = db.useQuery({ projects: {}, todos: {} });

	const activeProduct = useActiveProduct();

	const usage = [
		{
			label: 'Projects',
			used: data?.projects.length || 0,
			limit: activeProduct?.projectLimit || Number.POSITIVE_INFINITY,
		},
		{
			label: 'Todos',
			used: data?.todos.length || 0,
			limit: activeProduct?.todoLimit || Number.POSITIVE_INFINITY,
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
			<div className="flex gap-4 justify-start">
				<div className="flex flex-col gap-2 justify-between w-full">
					{usage.map((usage, i) => (
						<Fragment key={usage.label}>
							{i !== 0 && <Separator className="bg-white/7" />}
							<div className="flex items-center justify-items-stretch gap-2">
								<div className="flex flex-col w-44">
									<div className="font-medium text-sm">{usage.label}</div>
									<span className="text-sm">{usage.asFraction}</span>
								</div>
								<div className="flex flex-col items-end w-full">
									<Progress value={usage.asPercentRaw} />
									<div className="flex gap-4 justify-between">
										<span className="text-sm">{usage.asPercent}</span>
									</div>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
