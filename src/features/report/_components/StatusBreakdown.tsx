import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import ChartCard from "./ChartCard"
import ChartTooltip from "./ChartTooltip"
import type { Ticket } from "../ReportIndex";

type Status = "pending" | "in_progress" | "needs_feedback" | "closed";

const STATUS_COLORS: Record<Status, string> = {
  "pending": "#ef4444",
  "in_progress": "#f59e0b",
  "needs_feedback": "#10b981",
  "closed": "#94a3b8",
};
const formatStatus = (status: string) => {
  return status
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function StatusBreakdown({tickets}: {tickets: Ticket[]}) {

	const statusData = (["pending", "in_progress", "needs_feedback", "closed"] as Status[]).map(s => ({
    name: s, value: tickets.filter(t => t.status === s).length, color: STATUS_COLORS[s],
  })).filter(d => d.value > 0);

  return (
    <ChartCard title="Status Breakdown" subtitle="">
			<ResponsiveContainer width="100%" height={220}>
				<PieChart>
					<Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
							{statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
					</Pie>
					<Tooltip content={<ChartTooltip />} />
					<Legend
							iconType="circle"
							iconSize={8}
							wrapperStyle={{ fontSize: "11px" }}
							formatter={(value) => <span className="text-slate-600">{formatStatus(value)}</span>}
					/>
				</PieChart>
			</ResponsiveContainer>
    </ChartCard>
  )
}

export default StatusBreakdown