import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import ChartTooltip from "./ChartTooltip"
import { useCountAnimation, type Ticket } from "../ReportIndex";

type Status = "0" | "1";

const RATE_COLORS: Record<Status, string> = {
  "0": "#ef4444",
  "1": "#10b981",
};
const formatStatus = (status: string) => {
  return status === "0" ? "Unsatisfied" : "Satisfied";
};



function SatisfactionRating({tickets}: {tickets: Ticket[]}) {
	const statusData = (["0", "1"] as Status[]).map(s => ({
    name: formatStatus(s), value: tickets.filter(t => t.status === "closed" && t.rating?.toString() === s).length, color: RATE_COLORS[s],
  }));

	const likeCount = tickets.filter(t => t.status === "closed" && t.rating === 1).length;
	const closedTickets = tickets.filter(t => t.status === "closed").length;
	
  const satisfactionRate = statusData.length > 0 ? Math.round((likeCount / closedTickets) * 100) : 0;

  return (
		<div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4`}>
			<div>
				<h3 className="font-bold text-slate-800 text-sm">Satisfaction Rating</h3>
				<p className="text-xs text-slate-400 mt-0.5">Customer satisfaction levels</p>
			</div>

			<ResponsiveContainer width="100%" height={220}>
				<PieChart>
					<Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
							{statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
					</Pie>
					<Label position="center" fill="#666" fontSize={24} fontWeight="bold">
            {useCountAnimation(satisfactionRate)+"%"}
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
							<span className="text-xl leading-none">👍</span>
							<div>
								<p className="text-xs font-semibold text-slate-500">Satisfied</p>
								<p className="text-lg font-extrabold text-emerald-700 leading-tight">{useCountAnimation(likeCount)}</p>
							</div>
						</div>
					</div>
					<div className="w-1/2">
						<div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
							<span className="text-xl leading-none">👎</span>
							<div>
								<p className="text-xs font-semibold text-slate-500">Unsatisfied</p>
								<p className="text-lg font-extrabold text-rose-700 leading-tight">{useCountAnimation(closedTickets - likeCount)}</p>
							</div>
						</div>
					</div>
				</div>
		</div>
  )
}

export default SatisfactionRating