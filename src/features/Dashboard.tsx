import { useState, useEffect } from "react";
import config from "../config/config";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status   = "pending" | "in_progress" | "needs_feedback";

interface Ticket {
  id: string;
  ticket_number: string;
  sla_hours: number;
  subject: string;
  status: Status;
  requester: string;
  assigned_to: string | null;
  created_at: string;
  is_on_hold: number;
  on_hold_duration: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const now = new Date();

function getSlaStatus(deadline: string): "breached" | "critical" | "warning" | "ok" {
  const diff = (new Date(deadline).getTime() - now.getTime()) / 3600000;
  if (diff <= 0) return "breached";
  if (diff <= 1) return "critical";
  if (diff <= 2) return "warning";
  return "ok";
}

function timeAgo(iso: string): string {
  const ms   = now.getTime() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  const hrs  = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (mins < 1)  return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24)  return `${hrs}h ago`;
  return `${days}d ago`;
}

const fmtClock = (d: Date) => d.toLocaleTimeString("en-PH",  { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
const fmtDate  = (d: Date) => d.toLocaleDateString("en-PH",  { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// ─── Static style maps ────────────────────────────────────────────────────────

const STATUS_DOT: Record<Status, string> = {
  pending:          "bg-red-400",
  in_progress:      "bg-amber-400",
  needs_feedback:   "bg-green-400",
};

// Light bg / Dark bg for SLA row highlight
const SLA_ROW: Record<ReturnType<typeof getSlaStatus>, string> = {
  breached: "border-l-4 border-l-red-500    bg-red-50    dark:bg-red-500/10",
  critical: "border-l-4 border-l-orange-400 bg-orange-50 dark:bg-orange-400/10",
  warning:  "border-l-4 border-l-amber-400  bg-amber-50  dark:bg-amber-400/10",
  ok:       "border-l-4 border-l-transparent",
};

// ─── Stat Box ─────────────────────────────────────────────────────────────────

interface StatBoxProps {
  label: string; count: number; sub?: string;
  lightBg: string; darkBg: string;
  lightBorder: string; darkBorder: string;
  lightText: string; darkText: string;
  lightSub: string;
}

function StatBox({ label, count, lightBg, darkBg, lightBorder, darkBorder, lightText, darkText }: StatBoxProps) {
  return (
    <div className={`rounded-2xl border flex flex-col justify-between p-8 min-h-44 ${lightBg} ${darkBg} ${lightBorder} ${darkBorder}`}>
      <span className={`text font-bold uppercase tracking-widest ${lightText} ${darkText}`}>{formatStatus(label)}</span>
      <div>
        <span className={`text-[154px] font-black leading-none ${lightText} ${darkText}`}>{count}</span>
      </div>
    </div>
  );
}

// ─── Ticket Row ───────────────────────────────────────────────────────────────

function TicketRow({ ticket, breachIds, nearBreachIds }: { ticket: Ticket, breachIds: Set<string>, nearBreachIds: Set<string> }) {
  const sla = breachIds.has(ticket.id) ? "breached" : nearBreachIds.has(ticket.id) ? "warning" : "ok";
  return (
    <div className={`grid grid-cols-12 gap-4 px-5 py-3 rounded-xl ${SLA_ROW[sla]}`}>
      <span className="col-span-2 font-mono text-xs text-slate-400 dark:text-slate-600 shrink-0 text-center">{ticket.ticket_number}</span>
      <div className="col-span-5 flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[ticket.status]}`} />
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex-1 truncate">{ticket.subject}</span>
      </div>
      <span className="col-span-2 text-xs text-slate-400 dark:text-slate-600 shrink-0 text-center">{ticket.requester}</span>
      <span className="col-span-2 text-xs text-slate-400 dark:text-slate-600 shrink-0 text-center">{ticket.assigned_to}</span>
      <span className="col-span-1 text-xs text-slate-400 dark:text-slate-600 shrink-0 text-center">{timeAgo(ticket.created_at)}</span>
    </div>
  );
}

// ─── Near & Breach ───────────────────────────────────────────────────────────────


const WORK_START = 8;
const WORK_END = 17;

let holidaySet = new Set<string>();

// call this once after fetching holidays
export function setHolidays(holidays: string[]) {
	holidaySet = new Set(holidays);
}

function formatLocalDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function isWorkingDay(date: Date): boolean {
	return date.getDay() !== 0;
}

function nextDay(date: Date): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + 1);
	d.setHours(0, 0, 0, 0);
	return d;
}

function getWorkBounds(date: Date) {
	const start = new Date(date);
	start.setHours(WORK_START, 0, 0, 0);

	const end = new Date(date);
	end.setHours(WORK_END, 0, 0, 0);

	return { start, end };
}

export function workingSecondsDiff(start: Date, end: Date): number {
	if (end <= start) return 0;

	let totalSeconds = 0;
	let current = new Date(start);

	while (current < end) {
		const dayKey = formatLocalDate(current);

		if (isWorkingDay(current) && !holidaySet.has(dayKey)) {
			const { start: workStart, end: workEnd } = getWorkBounds(current);

			const rangeStart = new Date(
				Math.max(current.getTime(), workStart.getTime())
			);

			const rangeEnd = new Date(
				Math.min(end.getTime(), workEnd.getTime())
			);

			if (rangeEnd > rangeStart) {
				totalSeconds += Math.floor((rangeEnd.getTime() - rangeStart.getTime()) / 1000);
			}
		}
		current = nextDay(current);
	}
	return Math.max(0, totalSeconds);
}

export function getNetWorkingSeconds(start: Date, end: Date, onHoldSeconds: number): number {
	const working = workingSecondsDiff(start, end);
	return (Math.max(0, working - (onHoldSeconds || 0))) / (60 * 60);
}


const TWO_HOURS_MS = 2 * 60 * 60 * 1000
const isNearSlaBreach = (ticket: Ticket) => {
  if(ticket.is_on_hold === 0 && ticket.status !== 'needs_feedback'){
    const hours = getNetWorkingSeconds(new Date(ticket.created_at), new Date(), Number(ticket.on_hold_duration));
    const sla = ticket.sla_hours * 60 * 60 * 1000;
    const remaining = sla - hours * 60 * 60 * 1000;
    return remaining > 0 && remaining <= TWO_HOURS_MS;
  }else{
    return false;
  }
}

const isSlaBreach = (ticket: Ticket) => {
  if(ticket.is_on_hold === 0 && ticket.status !== 'needs_feedback'){
    const hours = getNetWorkingSeconds(new Date(ticket.created_at), new Date(), Number(ticket.on_hold_duration));
    const sla = ticket.sla_hours * 60 * 60 * 1000;
    const remaining = sla - hours * 60 * 60 * 1000;
    return remaining < 0;
  }else{
    return false;
  }
}


// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function TVDashboard() {
  const [dark, setDark]               = useState(false);
  const [clock, setClock]             = useState(new Date());
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [pulse, setPulse]             = useState(false);

  const [TICKETS, setTickets]         = useState<Ticket[]>([]);

  useEffect(() => { const t = setInterval(() => setClock(new Date()), 1000);  return () => clearInterval(t); }, []);
  useEffect(() => {
    const t = setInterval(() => { setLastRefresh(new Date()); setPulse(true); setTimeout(() => setPulse(false), 800); }, 30000);
    return () => clearInterval(t);
  }, []);

  const ticketsToDisplay = TICKETS.filter(t => t.status !== "needs_feedback");
  const newTickets        = TICKETS.filter(t => {
    return Date.now() - new Date(t.created_at).getTime() <= 24 * 60 * 60 * 1000
  });
  const pendingTickets    = TICKETS.filter(t => t.status === "pending");
  const inProgressTickets = TICKETS.filter(t => t.status === "in_progress");
  const needsFeedback     = TICKETS.filter(t => t.status === "needs_feedback");
  const slaBreached       = TICKETS.filter(isSlaBreach);
  const slaAtRisk         = TICKETS.filter(isNearSlaBreach);
  const openTickets       = TICKETS.filter(t => t.status !== "needs_feedback");
  const onHoldTickets       = TICKETS.filter(t => t.is_on_hold === 1);
  const breachIds = new Set(slaBreached.map(t => t.id))
  const nearBreachIds = new Set(slaAtRisk.map(t => t.id))
  const activeFeed = [...ticketsToDisplay].sort((a, b) => {
    const getPriority = (ticket: any) => {
      if (breachIds.has(ticket.id)) return 1
      if (nearBreachIds.has(ticket.id)) return 2
      return 3
    }

    return getPriority(a) - getPriority(b)
  })

	const fetchHolidays = async() => {
		const res = await config.get("/holidays");
		setHolidays(
			res.data.map((h: any) => h.date)
		);
	}

  const fetchTickets = async() => {
    const res = await config.get("/ticketing-plus/dashboard");
    setTickets(res.data);
  }

	useEffect(() => {
		fetchHolidays();
    fetchTickets();

    const interval = setInterval(() => {
      fetchTickets();
      setLastRefresh(new Date());
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
	}, [])

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col overflow-hidden font-sans transition-colors duration-300 pl-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-4">
            {/* Live dot */}
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-emerald-500 ${pulse ? "animate-ping" : "animate-pulse"}`} />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live</span>
            </div>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
            <h1 className="text-lg font-black tracking-tight">Dashboard</h1>
          </div>

          <div className="flex items-center gap-5">

            {/* Last refresh */}
            <span className="text-xs text-slate-400 dark:text-slate-600">Updated {fmtClock(lastRefresh)}</span>

            {/* Clock */}
            <div className="text-right">
              <p className="text-2xl font-black tracking-tight tabular-nums leading-none">{fmtClock(clock)}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{fmtDate(clock)}</p>
            </div>

            {/* Mode toggle */}
            <button
              onClick={() => setDark(d => !d)}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-base"
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-5 flex flex-col gap-5 min-h-0">

          {/* ── Row 1: Stat boxes ──────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            <StatBox
              label="New Today" count={newTickets.length} sub="Unacknowledged"
              lightBg="bg-blue-50"    darkBg="dark:bg-blue-950/60"
              lightBorder="border-blue-200"  darkBorder="dark:border-blue-800/60"
              lightText="text-blue-700"      darkText="dark:text-blue-300"
              lightSub="text-blue-400"
            />
            <StatBox
              label="pending" count={pendingTickets.length} sub="Awaiting assignment"
              lightBg="bg-red-50"     darkBg="dark:bg-red-950/60"
              lightBorder="border-red-200"   darkBorder="dark:border-red-800/60"
              lightText="text-red-700"       darkText="dark:text-red-300"
              lightSub="text-red-400"
            />
            <StatBox
              label="in_progress" count={inProgressTickets.length} sub="Actively being worked on"
              lightBg="bg-amber-50"   darkBg="dark:bg-amber-950/60"
              lightBorder="border-amber-200" darkBorder="dark:border-amber-800/60"
              lightText="text-amber-700"     darkText="dark:text-amber-300"
              lightSub="text-amber-400"
            />
            <StatBox
              label="needs_feedback" count={needsFeedback.length} sub="Awaiting requestor reply"
              lightBg="bg-emerald-50" darkBg="dark:bg-emerald-950/60"
              lightBorder="border-emerald-200" darkBorder="dark:border-emerald-800/60"
              lightText="text-emerald-700"   darkText="dark:text-emerald-300"
              lightSub="text-emerald-400"
            />
          </div>

          {/* ── Row 2: SLA alerts ──────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-4 shrink-0">
            {/* Breached */}
            <div className={`flex items-center gap-3 rounded-xl px-5 py-6 border flex-1 transition-colors ${
              slaBreached.length > 0
                ? "bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/40"
                : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/40"
              }`}>
                <span className={`text-xl ${slaBreached.length > 0 ? "animate-bounce" : ""}`}>🚨</span>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${slaBreached.length > 0 ? "text-red-600 dark:text-red-400" : "text-slate-400 dark:text-slate-600"}`}>
                    SLA Breached
                  </p>
                </div>
                <p className={`w-full text-center text-5xl font-black leading-none mb-0.5 ${slaBreached.length > 0 ? "text-red-700 dark:text-red-300" : "text-slate-300 dark:text-slate-700"}`}>
                  {slaBreached.length}
                </p>
            </div>

            {/* At Risk */}
            <div className={`flex items-center gap-3 rounded-xl px-5 py-6 border flex-1 transition-colors ${
                slaAtRisk.length > 0
                  ? "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/40"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/40"
              }`}>
              <span className={`text-xl ${slaAtRisk.length > 0 ? "animate-pulse" : ""}`}>⏰</span>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${slaAtRisk.length > 0 ? "text-amber-600 dark:text-amber-400" : "text-slate-400 dark:text-slate-600"}`}>
                  SLA At Risk
                </p>
              </div>
              <p className={`w-full text-center text-5xl font-black leading-none mb-0.5 ${slaAtRisk.length > 0 ? "text-amber-700 dark:text-amber-300" : "text-slate-300 dark:text-slate-700"}`}>
                {slaAtRisk.length}
              </p>
            </div>

            {/* On Hold */}
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-xl px-5 py-6 shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">ON HOLD</p>
                <p className="w-full text-center text-5xl font-black leading-none mt-0.5 text-slate-900 dark:text-white">{onHoldTickets.length}</p>
            </div>

            {/* Total Open */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/40 rounded-xl px-5 py-6 shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">Total Open</p>
                <p className="w-full text-center text-5xl font-black leading-none mt-0.5 text-slate-900 dark:text-white">{openTickets.length}</p>
            </div>
          </div>

          {/* ── Row 3: Feed + Sidebar ─────────────────────────────────────── */}
          <div className="flex gap-4 flex-1 min-h-0">

            {/* Live ticket feed */}
            <div className="flex-1 min-w-0 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-sm dark:shadow-none">
              {/* Feed header */}
              <div className="flex items-center justify-end px-5 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                {/* <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Tickets</span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">{TICKETS.length}</span>
                </div> */}
                {/* Priority legend */}
                <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-600">
                  {(["pending","in_progress","needs_feedback"] as Status[]).map(s => (
                    <div key={s} className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s]}`} />
                        {formatStatus(s)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column headers */}
              <div className="w-full grid grid-cols-12 gap-4 px-8 py-2 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-transparent shrink-0">
                <span className="col-span-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercas text-center">Ticket ID</span>
                <span className="col-span-5 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase">Subject</span>
                <span className="col-span-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase text-center">Submitted By</span>
                <span className="col-span-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase text-center">Assigned To</span>
                <span className="col-span-1 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase text-center">Submitted</span>
                {/* <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase w-28 text-right">SLA</span> */}
              </div>

              {/* Scrollable rows */}
              <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-hide">
                {activeFeed.map(t => <TicketRow key={t.id} ticket={t} breachIds={breachIds} nearBreachIds={nearBreachIds} />)}
              </div>
            </div>
          </div>
        </main>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
}