import ChartCard from './ChartCard'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartTooltip from './ChartTooltip'
import type { Ticket } from '../ReportIndex';

interface Props {
  from: string;
	to: string;
	tickets: Ticket[]
}

function getDateRange(from: string, to: string): string[] {
  const dates: string[] = [];

  const start = new Date(from);
  const end = new Date(to);

  while (start <= end) {
    dates.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  return dates;
}

function getDate(d: string) { return d.split('T')[0]; }

function DailyTicketTrends({ from, to, tickets } : Props) {
	const dates = getDateRange(from, to);
	
	const trendData = dates.map((date) => {
    const mt = tickets.filter(t => getDate(t.created_at) === date);
    return {
      date,
      Received: mt.length,
      Resolved: mt.filter(t => t.completed_at).length,
    };
  });

  return (
    <ChartCard title="Daily Ticket Trends" subtitle="Daily comparison of tickets received vs resolved" className="lg:col-span-2">
			<ResponsiveContainer width="100%" height={220}>
				<AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
					<defs>
							<linearGradient id="gReceived" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
								<stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
								<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
							</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
					<XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
					<Tooltip content={<ChartTooltip />} />
					<Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
					<Area type="monotone" dataKey="Received" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gReceived)" dot={{ r: 4, fill: "#3b82f6" }} />
					<Area type="monotone" dataKey="Resolved" stroke="#10b981" strokeWidth={2.5} fill="url(#gResolved)" dot={{ r: 4, fill: "#10b981" }} />
				</AreaChart>
			</ResponsiveContainer>
    </ChartCard>
  )
}

export default DailyTicketTrends