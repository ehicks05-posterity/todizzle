import { Alert } from '@/components/ui/alert';
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
			<div className="text-[17px] font-[700] leading-6">Usage</div>
			<Separator className="bg-white/7 h-[.667px]" />
			<div className="flex gap-4 justify-start">
				<div className="flex flex-col gap-2 justify-between w-full">
					{usage.map((usage, i) => (
						<Fragment key={usage.label}>
							{i !== 0 && <Separator className="bg-white/7 h-[.667px]" />}
							<div className="flex items-baseline justify-items-stretch gap-2 py-2 text-[13px]">
								<div className="flex flex-col w-44">
									<div className="font-medium">{usage.label}</div>
								</div>
								<div className="flex flex-col items-end w-full">
									<Progress value={usage.asPercentRaw} />
									<div className="flex gap-4 justify-between w-full">
										<span>{usage.asFraction}</span>
										<span>{usage.asPercent}</span>
									</div>
								</div>
							</div>
							{usage.asPercentRaw >= 75 && (
								<Alert
									variant="destructive"
									className="dark:text-red-500 dark:border-red-500"
								>
									{usage.asPercentRaw > 100
										? 'Your limit has been exceeded!'
										: usage.asPercentRaw === 100
											? 'Your limit has been reached!'
											: 'You are nearing your limit.'}
								</Alert>
							)}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
