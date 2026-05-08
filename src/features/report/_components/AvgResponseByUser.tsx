import ChartCard from './ChartCard'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'
import type { Ticket } from '../ReportIndex';
import { workingHoursDiff } from './KpiCards';

interface Props {
	tickets: Ticket[];
}

const COLORS: string[] = [
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ec4899", // pink

  "#06b6d4", // cyan
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#f97316", // orange
  "#84cc16", // lime

  "#ef4444", // red
  "#a855f7", // purple
  "#22c55e", // green
  "#eab308", // yellow
  "#0ea5e9", // sky

  "#d946ef", // fuchsia
  "#fb7185", // rose
  "#2dd4bf", // turquoise
  "#4ade80", // light green
  "#c084fc", // soft violet

  "#38bdf8", // light blue
  "#f472b6", // soft pink
  "#facc15", // gold
  "#818cf8", // periwinkle
  "#34d399", // mint
];

function AvgResponseByUser({ tickets } : Props) {
	const users = [
		...new Set(
			tickets
				.map(t => t.started_by)
				.filter(Boolean)
		)
	];

  const resolutionByUser = users.map((user, i) => {
    const resolved = tickets.filter(t => t.started_by === user && t.started_at);

    if (!resolved.length) return null;
		const avg = 	resolved.reduce((s, t) => {
			const hrs = workingHoursDiff(new Date(t.created_at), new Date(t.started_at));
			return s + hrs;
		}, 0) / resolved.length;
		
    return { name: user, hours: parseFloat(avg.toFixed(1)), color: COLORS[i] };
  })
	.filter(Boolean) as { name: string; hours: number; color: string }[];

  return (
    <ChartCard title="Avg. Response Time by User" subtitle="Average hours to response to a ticket per user">
			<ResponsiveContainer width="100%" height={220}>
				<BarChart data={resolutionByUser} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
					<XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="h" />
					<Tooltip content={<ChartTooltip />} formatter={(v) => [`${v}h`, "Avg. Time"]} />
					<Bar dataKey="hours" radius={[4, 4, 0, 0]} maxBarSize={32} label={{ position: "top", fontSize: 10, fill: "#94a3b8", formatter: (v) => `${v}h` }}>
						{resolutionByUser.map((entry, i) => <Cell key={i} fill={entry.color} />)}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</ChartCard>
  )
}

export default AvgResponseByUser