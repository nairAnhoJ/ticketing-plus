
interface Ticket {
    id: number;
    ticket_number: string;
    category: string;
    subject: string;
    status: "pending" | "in_progress" | "needs_feedback" | "closed";
    requester: string;
    created_at: string;
    completed_by: string;
}

interface Props {
	tickets: Ticket[];
	setSelectedTicketId: (id: number) => void;
	selectedTicket: Ticket | null;
}

type Status = "all" | "pending" | "in_progress" | "needs_feedback" | "closed";
const statusColors: Record<Status, string> = {
    all: "",
    pending: "bg-red-100 text-red-700 border border-red-200",
    in_progress: "bg-amber-100 text-amber-700 border border-amber-200",
    needs_feedback: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    closed: "bg-slate-100 text-slate-600 border border-slate-200",
};

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit" });
}

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function TicketList({ tickets, selectedTicket, setSelectedTicketId } : Props) {
	return (
	<div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
						<tr className="bg-slate-50 border-b border-slate-100">
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap">Ticket ID</th>
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider">Subject</th>
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider pl-6">Category</th>
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap pl-6">Status</th>
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap">Submitted By</th>
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap">Date</th>
								<th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap">Resolved By</th>
						</tr>
				</thead>
			<tbody className="divide-y divide-slate-50">
					{
							tickets.length === 0 && (
									<tr>
											<td colSpan={7} className="text-center py-10 text-slate-400 text-sm">
													No data.
											</td>
									</tr>
							)
					}

					{
							tickets.map(ticket => (
									<tr key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)} className={`cursor-pointer transition-colors hover:bg-slate-50 ${selectedTicket?.id === ticket.id ? "bg-slate-50 border-l-4 border-l-slate-900" : "border-l-4 border-l-transparent"}`}>
											<td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">{ticket.ticket_number}</td>
											<td className="px-4 py-3 text-slate-800 font-medium max-w-xs truncate">{ticket.subject}</td>
											<td className="px-4 py-3 whitespace-nowrap">
													<span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded-lg">{ticket.category}</span>
											</td>
											<td className="px-4 py-3 whitespace-nowrap">
													<span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusColors[ticket.status]}`}>{formatStatus(ticket.status)}</span>
											</td>
											<td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">{ticket.requester}</td>
											<td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{fmtDate(ticket.created_at)}</td>
											<td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{ticket.completed_by ?? <span className="text-slate-300">—</span>}</td>
									</tr>
							))
					}
				</tbody>
			</table>
		</div>

		{/* {totalPages > 1 && (
			<div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
				<span className="text-xs text-slate-400">Page {page} of {totalPages}</span>
				<div className="flex gap-1">
						<button
								onClick={() => setPage(p => Math.max(1, p - 1))}
								disabled={page === 1}
								className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
						>
								← Prev
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
								<button
								key={p}
								onClick={() => setPage(p)}
								className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${page === p ? "bg-slate-900 text-white" : "text-slate-600 border border-slate-200 hover:bg-slate-50"}`}
								>
								{p}
								</button>
						))}
						<button
								onClick={() => setPage(p => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
								className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
						>
								Next →
						</button>
				</div>
			</div>
		) */}
	
		</div>
	)
}

export default TicketList