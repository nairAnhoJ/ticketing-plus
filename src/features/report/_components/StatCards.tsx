interface Counts {
    all: number;
    pending: number;
    in_progress: number;
    needs_feedback: number;
    closed: number;
}

interface Props {
    counts: Counts;
}

function StatCard({ label, count, colorClass, dotColor }: { label: string; count: number; colorClass: string; dotColor: string }) {
    return (
        <div className={`rounded-2xl p-5 flex flex-col gap-1 shadow-sm border ${colorClass}`}>
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                <span className="text-sm font-semibold tracking-wide uppercase opacity-80">{label}</span>
            </div>
            <span className="text-4xl font-extrabold tracking-tight">{count}</span>
        </div>
    );
}

function StatCards({ counts } : Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="All Tickets" count={counts.all} colorClass="bg-white border-slate-200 text-slate-800" dotColor="bg-slate-800" />
        <StatCard label="Pending" count={counts.pending} colorClass="bg-red-50 border-red-200 text-red-800" dotColor="bg-red-500" />
        <StatCard label="In-Progress" count={counts.in_progress} colorClass="bg-amber-50 border-amber-200 text-amber-800" dotColor="bg-amber-500" />
        <StatCard label="Needs Feedback" count={counts.needs_feedback} colorClass="bg-emerald-50 border-emerald-200 text-emerald-800" dotColor="bg-emerald-500" />
        <StatCard label="Closed" count={counts.closed} colorClass="bg-slate-100 border-slate-200 text-slate-700" dotColor="bg-slate-400" />
    </div>
  )
}

export default StatCards