import { useCountAnimation } from "../report.hooks";
import type { Ticket } from "../report.types";
import { getNetWorkingSeconds, workingSecondsDiff } from "../report.utils";


function KpiCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-1 shadow-sm bg-white ${accent}`}>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  );
}

// Avg Response Hours
function avgResponseHrs(tickets: Ticket[]): string {
  const filteredTickets = tickets.filter(t => (t.status === "in_progress" || t.status === "closed" || t.status === "needs_feedback"));
  if (!filteredTickets.length) return "—";

  const avg = filteredTickets.reduce((s, t) => {
      console.log(t.on_hold_duration)
      const hrs = workingSecondsDiff(new Date(t.created_at), new Date(t.started_at));
      return s + hrs;
    }, 0) / filteredTickets.length;

  return `${(avg / (60 * 60)).toFixed(1)}h`;
}

// Avg Resolution Hours
function avgResolutionHrs(tickets: Ticket[]): string {
  const resolved = tickets.filter(t => (t.status === "closed" || t.status === "needs_feedback"));
  if (!resolved.length) return "—";

  const avg =
    resolved.reduce((s, t) => {
      const hrs = getNetWorkingSeconds(new Date(t.created_at), new Date(t.completed_at), Number(t.on_hold_duration));
      return s + hrs;
    }, 0) / resolved.length;

  return `${avg.toFixed(1)}h`;
}

interface Props {
  tickets: Ticket[];
}

function KpiCards({
  tickets,
} : Props) {

  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(t => (t.status === "closed" || t.status === "needs_feedback")).length;
  const closedTickets = tickets.filter(t => t.status === "closed").length;
  const likeCount = tickets.filter(t => t.status === "closed" && t.rating === 1).length;
  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;
  const satisfactionRate = closedTickets > 0 ? Math.round((likeCount / closedTickets) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <KpiCard label="Total Tickets" value={useCountAnimation(totalTickets)} sub="in selected period" accent="border-slate-200" />
      <KpiCard label="Resolved" value={useCountAnimation(resolvedTickets)} sub="fully resolved" accent="border-slate-200" />
      <KpiCard label="Resolution Rate" value={`${useCountAnimation(resolutionRate)}%`} sub="of all tickets" accent="border-emerald-200" />
      <KpiCard label="Avg Response" value={avgResponseHrs(tickets)} sub="per ticket" accent="border-sky-200" />
      <KpiCard label="Avg Resolution" value={avgResolutionHrs(tickets)} sub="per resolved ticket" accent="border-sky-200" />
      <KpiCard label="Satisfaction" value={`${closedTickets ? useCountAnimation(satisfactionRate)+'%' : "—"}`} sub={`${closedTickets} responses`} accent="border-sky-200" />
    </div>
  )
}

export default KpiCards