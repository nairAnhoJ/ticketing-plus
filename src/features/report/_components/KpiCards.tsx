import type { Ticket } from "../ReportIndex";

function KpiCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-1 shadow-sm bg-white ${accent}`}>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  );
}

// function resolutionHours(t: Ticket): number | null {
//   if (!t.completed_at) return null;
//   return (new Date(t.completed_at).getTime() - new Date(t.created_at).getTime()) / 3600000;
// }

// function avgResolutionHrs(tickets: Ticket[]): string {
//   const resolved = tickets.filter(t => t.status === "closed");
//   if (!resolved.length) return "—";
//   const avg = resolved.reduce((s, t) => s + resolutionHours(t)!, 0) / resolved.length;
//   return avg >= 24 ? `${(avg / 24).toFixed(1)}d` : `${avg.toFixed(1)}h`;
// }

const WORK_START = 8; // 8 AM
const WORK_END = 17;  // 5 PM

const PH_HOLIDAYS = [
  "2026-01-01",
  "2026-04-09",
  "2026-12-25",
  // add more...
];

function isHoliday(date: Date): boolean {
  const iso = date.toISOString().slice(0, 10);
  return PH_HOLIDAYS.includes(iso);
}

function isWorkingDay(date: Date): boolean {
  const day = date.getDay(); // 0 = Sun, 6 = Sat
  return day !== 0; // Mon–Sat only
}

function setTime(date: Date, hour: number): Date {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d;
}

function nextDay(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function workingHoursDiff(start: Date, end: Date): number {
  if (end <= start) return 0;

  let total = 0;
  let current = new Date(start);

  while (current < end) {
    if (isWorkingDay(current) && !isHoliday(current)) {
      const dayStart = setTime(current, WORK_START);
      const dayEnd = setTime(current, WORK_END);

      const rangeStart = new Date(Math.max(current.getTime(), dayStart.getTime()));
      const rangeEnd = new Date(Math.min(end.getTime(), dayEnd.getTime()));

      if (rangeEnd > rangeStart) {
        total += (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60);
      }
    }

    current = nextDay(current);
  }

  return total;
}

function avgResolutionHrs(tickets: Ticket[]): string {
  const resolved = tickets.filter(t => (t.status === "closed" || t.status === "needs_feedback"));
  if (!resolved.length) return "—";

  const avg =
    resolved.reduce((s, t) => {
      const hrs = workingHoursDiff(new Date(t.created_at), new Date(t.completed_at));
      return s + hrs;
    }, 0) / resolved.length;

  return `${avg.toFixed(1)}h`;
}

function avgResponseHrs(tickets: Ticket[]): string {
  const resolved = tickets.filter(t => (t.status === "in_progress" || t.status === "closed" || t.status === "needs_feedback"));
  if (!resolved.length) return "—";

  const avg =
    resolved.reduce((s, t) => {
      const hrs = workingHoursDiff(new Date(t.created_at), new Date(t.started_at));
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
      <KpiCard label="Total Tickets" value={totalTickets} sub="in selected period" accent="border-slate-200" />
      <KpiCard label="Resolved" value={resolvedTickets} sub="fully resolved" accent="border-slate-200" />
      <KpiCard label="Resolution Rate" value={`${resolutionRate}%`} sub="of all tickets" accent="border-emerald-200" />
      <KpiCard label="Avg Response" value={avgResponseHrs(tickets)} sub="per ticket" accent="border-sky-200" />
      <KpiCard label="Avg Resolution" value={avgResolutionHrs(tickets)} sub="per resolved ticket" accent="border-sky-200" />
      <KpiCard label="Satisfaction" value={`${closedTickets ? satisfactionRate+'%' : "—"}`} sub={`${closedTickets} responses`} accent="border-sky-200" />
    </div>
  )
}

export default KpiCards