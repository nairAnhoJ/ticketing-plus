import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import ChartTooltip from "./ChartTooltip"
import type { Ticket } from "../ReportIndex";

type Status = "met" | "notMet";

const RATE_COLORS: Record<Status, string> = {
  "met": "#10b981",
  "notMet": "#ef4444",
};
const formatStatus = (status: string) => {
  return status === "notMet" ? "Missed" : "Met";
};



function SlaCompliance({tickets}: {tickets: Ticket[]}) {
	function diffHours(start: string, end: string): number {
		const ms = new Date(end).getTime() - new Date(start).getTime();

		return ms / (1000 * 60 * 60);
	}

	const sla = tickets.reduce(
		(acc, ticket) => {
			if (!ticket.completed_at) return acc;

			const hours = diffHours(ticket.created_at, ticket.completed_at);

			if (hours <= ticket.sla_hours) {
				acc.met++;
			} else {
				acc.notMet++;
			}

			console.log(acc)
			return acc;
		},
		{
			met: 0,
			notMet: 0,
		}
	);

	const statusData = (["met", "notMet"] as Status[]).map(s => ({
    name: formatStatus(s), value: sla[s], color: RATE_COLORS[s],
  }));
	
  const slaComplianceRate = statusData.length > 0 ? Math.round((sla.met / (sla.met + sla.notMet)) * 100) : 0;

  return (
		<div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4`}>
			<div>
				<h3 className="font-bold text-slate-800 text-sm">SLA Compliance %</h3>
				<p className="text-xs text-slate-400 mt-0.5">Percentage of tickets resolved within SLA</p>
			</div>

			<ResponsiveContainer width="100%" height={220}>
				<PieChart>
					<Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
							{statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
					</Pie>
					<Label position="center" fill="#666" fontSize={24} fontWeight="bold">
            {slaComplianceRate+"%"}
          </Label>
					<Tooltip content={<ChartTooltip />} />
					<Legend
							iconType="circle"
							iconSize={8}
							wrapperStyle={{ fontSize: "11px" }}
							formatter={(value) => <span className="text-slate-600">{(value)}</span>}
					/>
				</PieChart>
			</ResponsiveContainer>

				<div className="w-full flex gap-x-6">
					<div className="w-1/2">
						<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
							{/* <span className="text-xl leading-none">👍</span> */}
							<div>
								<p className="text-xs font-semibold text-slate-500">Met</p>
								<p className="text-lg font-extrabold text-emerald-700 leading-tight">{sla.met}</p>
							</div>
						</div>
					</div>
					<div className="w-1/2">
						<div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
							{/* <span className="text-xl leading-none">👎</span> */}
							<div>
								<p className="text-xs font-semibold text-slate-500">Missed</p>
								<p className="text-lg font-extrabold text-rose-700 leading-tight">{sla.notMet}</p>
							</div>
						</div>
					</div>
				</div>
		</div>
  )
}

export default SlaCompliance