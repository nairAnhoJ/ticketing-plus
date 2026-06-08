import { useState } from "react";
import { getNetWorkingSeconds, workingSecondsDiff, type SelectedTicket } from "../ReportIndex";
import MessagesModal from "./MessagesModal";

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
	if(status){
		return status
			.split("_")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}
};

function DetailPanel({ selectedTicket, setSelectedTicket }: Props) {
	const [showMessages, setShowMessages] = useState(false);

	const responseHrs = () => {
		const avg = workingSecondsDiff(new Date(selectedTicket.created_at), new Date(selectedTicket.started_at));
		return avg / (60 * 60);
	}
	const avgResolutionHrs = () => {
		const avg = getNetWorkingSeconds(new Date(selectedTicket.created_at), new Date(selectedTicket.completed_at), Number(selectedTicket.on_hold_duration));
		return avg;
	}

	return (
		<>
			{ showMessages && <MessagesModal updates={selectedTicket.updates} onClose={() => setShowMessages(false)} /> }

			<div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-4">
				<div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
					<span className="font-bold text-slate-800 text-sm">Ticket Details</span>
					<div className="flex items-center gap-x-3">
						<button onClick={() => setShowMessages(true)} className="text-slate-400 hover:text-slate-700 text-lg leading-none transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more-icon lucide-message-circle-more"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
						</button>
						<button onClick={() => setSelectedTicket()} className="text-slate-400 hover:text-slate-700 text-lg leading-none transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
						</button>
					</div>
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

					<div className="flex flex-col gap-0.5">
							<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted By</span>
							<span className="text-sm text-slate-800 font-medium">{selectedTicket.requester}</span>
					</div>
					<div className="flex flex-col gap-0.5">
							<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Submitted At</span>
							<span className="text-sm text-slate-700">{fmt(selectedTicket.requested_at)}</span>
					</div>
					<div className="block mt-6 border-t border-slate-100 pt-3"></div>
					{selectedTicket.completed_by && (
							<>
									<div className="flex flex-col gap-0.5">
											<span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolution / Action Taken</span>
											<span className="text-sm text-slate-700">{selectedTicket.resolution}</span>
									</div>
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

					{/* Resolution time */}
					{
						selectedTicket.started_at && (
							<div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
									<span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Response Time</span>
									<p className="text-sm font-bold text-emerald-800 mt-1">
										{responseHrs().toFixed(2)}h
									</p>
							</div>
						)
					}

					{/* Resolution time */}
					{
						selectedTicket.completed_at && (
							<div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
									<span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Resolution Time</span>
									<p className="text-sm font-bold text-emerald-800 mt-1">
										{avgResolutionHrs().toFixed(2)}h
									</p>
							</div>
						)
					}
				</div>
			</div>
		</>
	)
}

export default DetailPanel