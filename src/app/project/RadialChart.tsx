'use client';

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from 'recharts';

import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartConfig = {
	progress: {
		label: 'Progress',
	},
	safari: {
		label: 'Safari',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function RadialChart({ value = 0, label }: { value: number; label: string }) {
	const chartData = [{ value: value, fill: 'var(--color-safari)' }];

	return (
		<div className="flex flex-col border rounded-xl">
			<ChartContainer
				config={chartConfig}
				className="mx-auto aspect-square max-h-48 min-h-40"
			>
				<RadialBarChart
					data={chartData}
					startAngle={0}
					endAngle={value * 360}
					innerRadius={60}
					outerRadius={80}
				>
					<PolarGrid
						gridType="circle"
						radialLines={false}
						stroke="none"
						className="first:fill-muted last:fill-background"
						polarRadius={[64, 56]}
					/>
					<RadialBar dataKey="value" background cornerRadius={0} />
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						<Label
							content={({ viewBox }) => {
								if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-2xl font-bold"
											>
												{label}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												{chartConfig.progress.label}
											</tspan>
										</text>
									);
								}
							}}
						/>
					</PolarRadiusAxis>
				</RadialBarChart>
			</ChartContainer>
		</div>
	);
}
