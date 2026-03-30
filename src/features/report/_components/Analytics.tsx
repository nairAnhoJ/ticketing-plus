import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
  RadialBarChart, RadialBar,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Pending" | "In-Progress" | "Needs Feedback" | "Closed";
type Category = "IT" | "HR" | "Finance" | "Facilities" | "Admin";
type Priority = "Low" | "Medium" | "High" | "Critical";

interface Ticket {
  id: string;
  title: string;
  status: Status;
  category: Category;
  priority: Priority;
  submittedBy: string;
  resolvedBy: string | null;
  submittedAt: string;
  resolvedAt: string | null;
  rating: number | null; // 1–5
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_TICKETS: Ticket[] = [
  { id: "T26-01-000001", title: "Email not syncing on mobile", status: "Closed", category: "IT", priority: "Medium", submittedBy: "Henry Jabunan", resolvedBy: "John Arian Malondras", submittedAt: "2026-01-05T09:00:00", resolvedAt: "2026-01-05T11:30:00", rating: 5 },
  { id: "T26-01-000002", title: "Cannot connect to office WiFi", status: "Closed", category: "IT", priority: "High", submittedBy: "Maria Santos", resolvedBy: "John Arian Malondras", submittedAt: "2026-01-08T10:00:00", resolvedAt: "2026-01-08T14:00:00", rating: 4 },
  { id: "T26-01-000003", title: "Leave form not submitting", status: "Closed", category: "HR", priority: "Medium", submittedBy: "Carlo Reyes", resolvedBy: "Patricia Lim", submittedAt: "2026-01-10T08:00:00", resolvedAt: "2026-01-12T09:00:00", rating: 3 },
  { id: "T26-01-000004", title: "Broken AC unit in Floor 2", status: "Closed", category: "Facilities", priority: "High", submittedBy: "Ana Dela Cruz", resolvedBy: "Patricia Lim", submittedAt: "2026-01-12T13:00:00", resolvedAt: "2026-01-15T16:00:00", rating: 4 },
  { id: "T26-01-000005", title: "Reimbursement not processed", status: "Closed", category: "Finance", priority: "High", submittedBy: "Jose Mendoza", resolvedBy: "Patricia Lim", submittedAt: "2026-01-14T11:00:00", resolvedAt: "2026-01-16T10:00:00", rating: 5 },
  { id: "T26-01-000006", title: "Software license renewal", status: "Closed", category: "IT", priority: "Low", submittedBy: "Liza Reyes", resolvedBy: "John Arian Malondras", submittedAt: "2026-01-18T09:00:00", resolvedAt: "2026-01-20T15:00:00", rating: 4 },
  { id: "T26-01-000007", title: "Payroll discrepancy January", status: "Closed", category: "Finance", priority: "Critical", submittedBy: "Miguel Torres", resolvedBy: "Patricia Lim", submittedAt: "2026-01-20T08:00:00", resolvedAt: "2026-01-21T09:00:00", rating: 5 },
  { id: "T26-01-000008", title: "New employee badge request", status: "Closed", category: "Admin", priority: "Low", submittedBy: "Rose Garcia", resolvedBy: "Patricia Lim", submittedAt: "2026-01-22T10:00:00", resolvedAt: "2026-01-23T11:00:00", rating: 5 },
  { id: "T26-02-000001", title: "VPN drops connection frequently", status: "Closed", category: "IT", priority: "High", submittedBy: "Dennis Cruz", resolvedBy: "John Arian Malondras", submittedAt: "2026-02-03T09:00:00", resolvedAt: "2026-02-04T10:00:00", rating: 3 },
  { id: "T26-02-000002", title: "Printer paper jam 2F", status: "Closed", category: "Facilities", priority: "Low", submittedBy: "Jasmine Tan", resolvedBy: "Patricia Lim", submittedAt: "2026-02-05T11:00:00", resolvedAt: "2026-02-05T14:00:00", rating: 4 },
  { id: "T26-02-000003", title: "Onboarding kit missing items", status: "Closed", category: "HR", priority: "Medium", submittedBy: "Henry Jabunan", resolvedBy: "Patricia Lim", submittedAt: "2026-02-07T09:00:00", resolvedAt: "2026-02-10T11:00:00", rating: 2 },
  { id: "T26-02-000004", title: "Monitor flickering on desktop", status: "Closed", category: "IT", priority: "Medium", submittedBy: "Maria Santos", resolvedBy: "John Arian Malondras", submittedAt: "2026-02-10T10:00:00", resolvedAt: "2026-02-11T12:00:00", rating: 4 },
  { id: "T26-02-000005", title: "Conference room booking conflict", status: "Closed", category: "Admin", priority: "Low", submittedBy: "Carlo Reyes", resolvedBy: "Patricia Lim", submittedAt: "2026-02-12T14:00:00", resolvedAt: "2026-02-12T16:00:00", rating: 5 },
  { id: "T26-02-000006", title: "SSS contribution error", status: "Closed", category: "Finance", priority: "High", submittedBy: "Ana Dela Cruz", resolvedBy: "Patricia Lim", submittedAt: "2026-02-14T09:00:00", resolvedAt: "2026-02-16T10:00:00", rating: 4 },
  { id: "T26-02-000007", title: "Door lock not working 3F", status: "Closed", category: "Facilities", priority: "Critical", submittedBy: "Jose Mendoza", resolvedBy: "Patricia Lim", submittedAt: "2026-02-17T08:00:00", resolvedAt: "2026-02-17T10:00:00", rating: 5 },
  { id: "T26-02-000008", title: "System access for new hire", status: "Closed", category: "IT", priority: "Medium", submittedBy: "Liza Reyes", resolvedBy: "John Arian Malondras", submittedAt: "2026-02-19T09:00:00", resolvedAt: "2026-02-20T11:00:00", rating: 4 },
  { id: "T26-02-000009", title: "Payslip not received Feb", status: "Closed", category: "Finance", priority: "High", submittedBy: "Miguel Torres", resolvedBy: "Patricia Lim", submittedAt: "2026-02-21T10:00:00", resolvedAt: "2026-02-22T09:00:00", rating: 3 },
  { id: "T26-02-000010", title: "Desk chair broken", status: "Closed", category: "Facilities", priority: "Medium", submittedBy: "Rose Garcia", resolvedBy: "Patricia Lim", submittedAt: "2026-02-24T11:00:00", resolvedAt: "2026-02-27T13:00:00", rating: 4 },
  { id: "T26-03-000001", title: "Laptop overheating", status: "In-Progress", category: "IT", priority: "High", submittedBy: "Henry Jabunan", resolvedBy: null, submittedAt: "2026-03-02T11:00:00", resolvedAt: null, rating: null },
  { id: "T26-03-000002", title: "Monitor not powering on", status: "Pending", category: "IT", priority: "Medium", submittedBy: "Henry Jabunan", resolvedBy: null, submittedAt: "2026-03-02T10:55:00", resolvedAt: null, rating: null },
  { id: "T26-03-000003", title: "Keyboard not responding properly", status: "Needs Feedback", category: "IT", priority: "Low", submittedBy: "Henry Jabunan", resolvedBy: "John Arian Malondras", submittedAt: "2026-03-02T11:00:00", resolvedAt: "2026-03-18T06:22:00", rating: null },
  { id: "T26-03-000004", title: "Cannot access shared drive", status: "Closed", category: "IT", priority: "High", submittedBy: "Maria Santos", resolvedBy: "John Arian Malondras", submittedAt: "2026-03-05T09:30:00", resolvedAt: "2026-03-07T14:00:00", rating: 4 },
  { id: "T26-03-000005", title: "New office chair request", status: "Pending", category: "Facilities", priority: "Medium", submittedBy: "Carlo Reyes", resolvedBy: null, submittedAt: "2026-03-08T08:00:00", resolvedAt: null, rating: null },
  { id: "T26-03-000006", title: "Payslip not received Feb", status: "Closed", category: "Finance", priority: "High", submittedBy: "Ana Dela Cruz", resolvedBy: "Patricia Lim", submittedAt: "2026-03-10T13:15:00", resolvedAt: "2026-03-11T09:00:00", rating: 5 },
  { id: "T26-03-000007", title: "Onboarding documents missing", status: "In-Progress", category: "HR", priority: "Medium", submittedBy: "Jose Mendoza", resolvedBy: null, submittedAt: "2026-03-12T10:00:00", resolvedAt: null, rating: null },
  { id: "T26-03-000008", title: "Projector broken Conf Room B", status: "Closed", category: "Facilities", priority: "Critical", submittedBy: "Liza Reyes", resolvedBy: "John Arian Malondras", submittedAt: "2026-03-14T15:30:00", resolvedAt: "2026-03-14T17:00:00", rating: 5 },
  { id: "T26-03-000009", title: "VPN access request", status: "Needs Feedback", category: "IT", priority: "Medium", submittedBy: "Miguel Torres", resolvedBy: null, submittedAt: "2026-03-15T09:00:00", resolvedAt: null, rating: null },
  { id: "T26-03-000010", title: "Leave balance discrepancy", status: "In-Progress", category: "HR", priority: "High", submittedBy: "Rose Garcia", resolvedBy: null, submittedAt: "2026-03-17T11:00:00", resolvedAt: null, rating: null },
  { id: "T26-03-000011", title: "Printer color not working 3F", status: "Pending", category: "Facilities", priority: "Low", submittedBy: "Dennis Cruz", resolvedBy: null, submittedAt: "2026-03-18T08:45:00", resolvedAt: null, rating: null },
  { id: "T26-03-000012", title: "Email account locked", status: "Closed", category: "IT", priority: "Critical", submittedBy: "Jasmine Tan", resolvedBy: "John Arian Malondras", submittedAt: "2026-03-19T07:00:00", resolvedAt: "2026-03-19T08:30:00", rating: 5 },
];

// ─── Color Palettes ───────────────────────────────────────────────────────────

const STATUS_COLORS: Record<Status, string> = {
  "Pending": "#ef4444",
  "In-Progress": "#f59e0b",
  "Needs Feedback": "#10b981",
  "Closed": "#94a3b8",
};

const CATEGORY_COLORS: Record<Category, string> = {
  "IT": "#3b82f6",
  "HR": "#8b5cf6",
  "Finance": "#f59e0b",
  "Facilities": "#10b981",
  "Admin": "#ec4899",
};

const PRIORITY_COLORS: Record<Priority, string> = {
  "Low": "#38bdf8",
  "Medium": "#a78bfa",
  "High": "#fb923c",
  "Critical": "#f43f5e",
};

const MONTH_LABELS = ["Jan", "Feb", "Mar"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMonth(d: string) { return new Date(d).getMonth(); }

function resolutionHours(t: Ticket): number | null {
  if (!t.resolvedAt) return null;
  return (new Date(t.resolvedAt).getTime() - new Date(t.submittedAt).getTime()) / 3600000;
}

function avgResolutionHrs(tickets: Ticket[]): string {
  const resolved = tickets.filter(t => t.resolvedAt);
  if (!resolved.length) return "—";
  const avg = resolved.reduce((s, t) => s + resolutionHours(t)!, 0) / resolved.length;
  return avg >= 24 ? `${(avg / 24).toFixed(1)}d` : `${avg.toFixed(1)}h`;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 shadow-xl border border-slate-700">
      {label && <p className="font-semibold mb-1 text-slate-300">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}: <span className="font-bold text-white">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Chart Card wrapper ───────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 ${className}`}>
      <div>
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-1 shadow-sm bg-white ${accent}`}>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-base ${i <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}>★</span>
      ))}
    </div>
  );
}

// ─── Date range filter ────────────────────────────────────────────────────────

type Range = "all" | "jan" | "feb" | "mar";

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Analytics() {
  const [range, setRange] = useState<Range>("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "">("");

  const tickets = useMemo(() => {
    let t = MOCK_TICKETS;
    if (range === "jan") t = t.filter(x => getMonth(x.submittedAt) === 0);
    else if (range === "feb") t = t.filter(x => getMonth(x.submittedAt) === 1);
    else if (range === "mar") t = t.filter(x => getMonth(x.submittedAt) === 2);
    if (categoryFilter) t = t.filter(x => x.category === categoryFilter);
    return t;
  }, [range, categoryFilter]);

  // ── Derived chart data ────────────────────────────────────────────────────

  // 1. Tickets per month (line + area)
  const ticketsPerMonth = MONTH_LABELS.map((month, i) => {
    const mt = MOCK_TICKETS.filter(t => getMonth(t.submittedAt) === i);
    return {
      month,
      Total: mt.length,
      Closed: mt.filter(t => t.status === "Closed").length,
      Open: mt.filter(t => t.status !== "Closed").length,
    };
  });

  // 2. Status breakdown (pie)
  const statusData = (["Pending", "In-Progress", "Needs Feedback", "Closed"] as Status[]).map(s => ({
    name: s, value: tickets.filter(t => t.status === s).length, color: STATUS_COLORS[s],
  })).filter(d => d.value > 0);

  // 3. Tickets by category (bar)
  const categoryData = (["IT", "HR", "Finance", "Facilities", "Admin"] as Category[]).map(c => ({
    name: c,
    Total: tickets.filter(t => t.category === c).length,
    Closed: tickets.filter(t => t.category === c && t.status === "Closed").length,
  })).filter(d => d.Total > 0);

  // 4. Priority distribution (bar)
  const priorityData = (["Low", "Medium", "High", "Critical"] as Priority[]).map(p => ({
    name: p,
    count: tickets.filter(t => t.priority === p).length,
    color: PRIORITY_COLORS[p],
  })).filter(d => d.count > 0);

  // 5. Avg resolution time per category
  const resolutionByCategory = (["IT", "HR", "Finance", "Facilities", "Admin"] as Category[]).map(c => {
    const resolved = tickets.filter(t => t.category === c && t.resolvedAt);
    if (!resolved.length) return null;
    const avg = resolved.reduce((s, t) => s + resolutionHours(t)!, 0) / resolved.length;
    return { name: c, hours: parseFloat(avg.toFixed(1)), color: CATEGORY_COLORS[c] };
  }).filter(Boolean) as { name: string; hours: number; color: string }[];

  // 6. Tickets per resolver (stacked bar)
  const resolvers = ["John Arian Malondras", "Patricia Lim"];
  const resolverData = resolvers.map(r => {
    const rt = tickets.filter(t => t.resolvedBy === r);
    return {
      name: r.split(" ").slice(-1)[0], // last name only
      fullName: r,
      Closed: rt.filter(t => t.status === "Closed").length,
      "Needs Feedback": rt.filter(t => t.status === "Needs Feedback").length,
      total: rt.length,
    };
  });

  // 7. Satisfaction ratings
  const ratedTickets = tickets.filter(t => t.rating !== null);
  const avgRating = ratedTickets.length ? (ratedTickets.reduce((s, t) => s + t.rating!, 0) / ratedTickets.length) : 0;
  const ratingDist = [1,2,3,4,5].map(r => ({
    star: `${r}★`, count: ratedTickets.filter(t => t.rating === r).length,
    fill: r >= 4 ? "#f59e0b" : r === 3 ? "#94a3b8" : "#ef4444",
  }));

  // 8. Open vs Closed over time (area)
  const trendData = MONTH_LABELS.map((month, i) => {
    const mt = MOCK_TICKETS.filter(t => getMonth(t.submittedAt) === i);
    return {
      month,
      Submitted: mt.length,
      Resolved: mt.filter(t => t.resolvedAt).length,
    };
  });

  // KPI values
  const totalTickets = tickets.length;
  const closedTickets = tickets.filter(t => t.status === "Closed").length;
  const resolutionRate = totalTickets ? Math.round((closedTickets / totalTickets) * 100) : 0;
  const pendingCount = tickets.filter(t => t.status === "Pending").length;
  const criticalCount = tickets.filter(t => t.priority === "Critical").length;

  const RANGES: { key: Range; label: string }[] = [
    { key: "all", label: "All Time" },
    { key: "jan", label: "January" },
    { key: "feb", label: "February" },
    { key: "mar", label: "March" },
  ];


  const CATEGORIES_LIST: string[] = ["IT", "HR", "Finance", "Facilities", "Admin"];

  return (
    <div className="fixed top-0 left-0 pl-16 w-full h-screen overflow-y-auto bg-slate-50 z-9">
      {/* Header */}
      <header className="text-[#212121] px-8 py-5 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Analytics & Charts</h1>
          {/* <p className="text-slate-400 text-sm mt-0.5">Visual breakdown of ticket data across all categories</p> */}
        </div>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </button>
        </div>
      </header>

      <main className="px-8 py-6 max-w-screen-2xl mx-auto space-y-6">

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard label="Total Tickets" value={totalTickets} sub="in selected period" accent="border-slate-200" />
          <KpiCard label="Closed" value={closedTickets} sub="fully resolved" accent="border-slate-200" />
          <KpiCard label="Resolution Rate" value={`${resolutionRate}%`} sub="of all tickets" accent="border-emerald-200" />
          <KpiCard label="Pending" value={pendingCount} sub="awaiting action" accent="border-red-200" />
          <KpiCard label="Critical" value={criticalCount} sub="high priority open" accent="border-rose-200" />
          <KpiCard label="Avg Resolution" value={avgResolutionHrs(tickets)} sub="per resolved ticket" accent="border-sky-200" />
        </div>

        {/* Row 1: Area trend + Status Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard title="Submission vs Resolution Trend" subtitle="Monthly comparison of tickets submitted vs resolved" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gSubmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Area type="monotone" dataKey="Submitted" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gSubmitted)" dot={{ r: 4, fill: "#3b82f6" }} />
                <Area type="monotone" dataKey="Resolved" stroke="#10b981" strokeWidth={2.5} fill="url(#gResolved)" dot={{ r: 4, fill: "#10b981" }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Status Breakdown" subtitle="Distribution of current ticket statuses">
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
                  formatter={(value) => <span className="text-slate-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Row 2: Category bar + Priority bar */}
        <div className="grid grid-cols-1 gap-4">
          <ChartCard title="Tickets by Category" subtitle="Total submitted vs closed per department">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Bar dataKey="Total" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="Closed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* <ChartCard title="Priority Distribution" subtitle="Breakdown of tickets by urgency level">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={priorityData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
                  {priorityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard> */}
        </div>

        {/* Row 3: Resolution time + Resolver performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Avg. Resolution Time by Category" subtitle="Average hours to close a ticket per department">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={resolutionByCategory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} unit="h" />
                <Tooltip content={<ChartTooltip />} formatter={(v: number) => [`${v}h`, "Avg. Time"]} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]} maxBarSize={32} label={{ position: "top", fontSize: 10, fill: "#94a3b8", formatter: (v: number) => `${v}h` }}>
                  {resolutionByCategory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Resolver Performance" subtitle="Tickets handled per support agent">
            <div className="space-y-4">
              {resolverData.map(r => (
                <div key={r.name} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-semibold text-slate-700">{r.fullName}</span>
                      <span className="text-xs text-slate-400 ml-2">{r.total} tickets</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{r.total ? Math.round((r.Closed / r.total) * 100) : 0}% closed</span>
                  </div>
                  <div className="flex rounded-full overflow-hidden h-3 bg-slate-100">
                    {r.Closed > 0 && (
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${r.total ? (r.Closed / r.total) * 100 : 0}%` }}
                      />
                    )}
                    {r["Needs Feedback"] > 0 && (
                      <div
                        className="bg-emerald-200 h-full transition-all duration-500"
                        style={{ width: `${r.total ? (r["Needs Feedback"] / r.total) * 100 : 0}%` }}
                      />
                    )}
                  </div>
                  <div className="flex gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Closed: {r.Closed}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-200 inline-block" />Needs Feedback: {r["Needs Feedback"]}</span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Row 4: Satisfaction + Monthly volume line */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard title="Satisfaction Ratings" subtitle="Requestor feedback on resolved tickets">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-extrabold text-slate-900">{avgRating.toFixed(1)}</span>
              <div>
                <Stars rating={avgRating} />
                <p className="text-xs text-slate-400 mt-1">{ratedTickets.length} ratings received</p>
              </div>
            </div>
            <div className="space-y-2">
              {[5,4,3,2,1].map(star => {
                const item = ratingDist.find(r => r.star === `${star}★`)!;
                const pct = ratedTickets.length ? (item.count / ratedTickets.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-4 text-right">{star}</span>
                    <span className="text-amber-400 text-sm">★</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: item.fill }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-4">{item.count}</span>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          <ChartCard title="Monthly Ticket Volume" subtitle="Total tickets submitted per month" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ticketsPerMonth} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Line type="monotone" dataKey="Total" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 5, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="Closed" stroke="#10b981" strokeWidth={2.5} dot={{ r: 5, fill: "#10b981", strokeWidth: 0 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="Open" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 4" dot={{ r: 5, fill: "#f59e0b", strokeWidth: 0 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

      </main>
    </div>
  );
}