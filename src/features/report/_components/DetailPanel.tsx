interface SelectedTicket {
	id: number;
	ticket_number: string;
	category: string;
	subject: string;
	description: string;
	status: "pending" | "in_progress" | "needs_feedback" | "closed";
	requester: string;
	requested_at: string;
	created_at: string;
	completed_by: string;
	completed_at: string;
}

interface Props {
	selectedTicket: SelectedTicket;
	setSelectedTicket: () => void;
}

type Status = "all" | "pending" | "in_progress" | "needs_feedback" | "closed";
const statusColors: Record<Status, string> = {
    all: "",
    pending: "bg-red-100 text-red-700 border border-red-200",
    in_progress: "bg-amber-100 text-amber-700 border border-amber-200",
    needs_feedback: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    closed: "bg-slate-100 text-slate-600 border border-slate-200",
};
 
function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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

function avgResolutionHrs(tickets: SelectedTicket): string {
	const avg = workingHoursDiff(new Date(tickets.created_at), new Date(tickets.completed_at));

	return `${avg.toFixed(1)}h`;
	// return avg >= 24 ? `${(avg / 24).toFixed(1)}d` : `${avg.toFixed(1)}h`;
}

function DetailPanel({ selectedTicket, setSelectedTicket }: Props) {
  return (
		<div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-4">
			<div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
				<span className="font-bold text-slate-800 text-sm">Ticket Details</span>
				<button onClick={() => setSelectedTicket()} className="text-slate-400 hover:text-slate-700 text-lg leading-none transition-colors">×</button>
			</div>

			<div className="p-5 space-y-4">
				{/* ID + Status */}
				<div className="flex items-center justify-between gap-2">
						<span className="font-mono text-xs text-slate-500">{selectedTicket.ticket_number}</span>
						<span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${statusColors[selectedTicket.status]}`}>{formatStatus(selectedTicket.status)}</span>
				</div>

				{/* Badges */}
				<div className="flex flex-wrap gap-2">
						<span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg">{selectedTicket.category}</span>
				</div>

				{/* Title */}
				<div>
						<h3 className="font-bold text-slate-900 leading-snug">{selectedTicket.subject}</h3>
						<p className="text-slate-500 text-xs mt-2 leading-relaxed whitespace-pre-wrap">{selectedTicket.description}</p>
				</div>

				<div className="border-t border-slate-100 pt-4 space-y-3">
				<div className="flex flex-col gap-0.5">
						<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted By</span>
						<span className="text-sm text-slate-800 font-medium">{selectedTicket.requester}</span>
				</div>
				<div className="flex flex-col gap-0.5">
						<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted At</span>
						<span className="text-sm text-slate-700">{fmt(selectedTicket.requested_at)}</span>
				</div>
				{selectedTicket.completed_by && (
						<>
								<div className="flex flex-col gap-0.5">
										<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved By</span>
										<span className="text-sm text-slate-800 font-medium">{selectedTicket.completed_by}</span>
								</div>
								{selectedTicket.completed_at && (
										<div className="flex flex-col gap-0.5">
										<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved At</span>
										<span className="text-sm text-slate-700">{fmt(selectedTicket.completed_at)}</span>
										</div>
								)}
						</>
				)}
				</div>

				{/* Resolution time */}
				{
					selectedTicket.completed_at && (
							<div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
									<span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Resolution Time</span>
									<p className="text-sm font-bold text-emerald-800 mt-1">
										{
											avgResolutionHrs(selectedTicket)
										}
									</p>
							</div>
					)
				}
			</div>
		</div>
  )
}

export default DetailPanel