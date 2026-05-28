import ChartCard from './ChartCard'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'
import { workingHoursDiff, type Option, type Ticket } from '../ReportIndex';

interface Props {
	tickets: Ticket[];
  categories: Option[];
}

const COLORS: string[] = [
  "#34d399", // mint
  "#818cf8", // periwinkle
  "#facc15", // gold
  "#f472b6", // soft pink
  "#38bdf8", // light blue

  "#c084fc", // soft violet
  "#4ade80", // light green
  "#2dd4bf", // turquoise
  "#fb7185", // rose
  "#d946ef", // fuchsia

  "#0ea5e9", // sky
  "#eab308", // yellow
  "#22c55e", // green
  "#a855f7", // purple
  "#ef4444", // red
  
  "#84cc16", // lime
  "#f97316", // orange
  "#14b8a6", // teal
  "#6366f1", // indigo
  "#06b6d4", // cyan

  "#ec4899", // pink
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#3b82f6", // blue
];

function AvgResolutionByCategory({ tickets, categories } : Props) {

  const resolutionByUser = categories.map((c, i) => {
    const resolved = tickets.filter(t => t.category === c.name && t.completed_at);

    if (!resolved.length) return null;
		const avg = 	resolved.reduce((s, t) => {
			const hrs = workingHoursDiff(new Date(t.created_at), new Date(t.completed_at));
			return s + hrs;
		}, 0) / resolved.length;
		
    return { name: c.name, hours: parseFloat(avg.toFixed(1)), color: COLORS[i] };
  })
	.filter(Boolean) as { name: string; hours: number; color: string }[];

  return (
    <ChartCard title="Avg. Resolution Time by Category" subtitle="Average hours to resolve a ticket per category">
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

export default AvgResolutionByCategory