import { useState } from "react";
import type { SelectedTicket, Status, Ticket } from "../report.types";
import config from "../../../config/config";

interface Props {
  tickets: Ticket[];
  showMissedTickets: boolean;
  onClose: () => void;
}

const STATUS_STYLES: Record<Status, string> = {
  "all":            "bg-red-50 text-red-700 border border-red-200",
  "pending":        "bg-red-50 text-red-700 border border-red-200",
  "in_progress":    "bg-amber-50 text-amber-700 border border-amber-200",
  "needs_feedback": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "closed":         "bg-slate-100 text-slate-600 border border-slate-200",
};


function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
 
// ─── Detail Panel ─────────────────────────────────────────────────────────────
 
function TicketDetail({ ticket }: { ticket: SelectedTicket }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
 
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
 
        {/* Top: ID + badges */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{ticket.ticket_number}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${STATUS_STYLES[ticket.status]}`}>{(ticket.status).replace('_', '-').toUpperCase()}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-700`}>{ticket.requester_department}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700`}>{ticket.ticket_category}</span>
          </div>
          <h2 className="text-base font-bold text-slate-800 leading-snug">{ticket.subject}</h2>
          <p className="text-sm text-slate-500 leading-relaxed">{ticket.description}</p>
        </div>
 
        {/* SLA breach banner */}
        {/* <div className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${OVERDUE_COLOR(ticket.overdueBy)}`}>
          <span className="text-lg flex-shrink-0">🚨</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">SLA Breached</p>
            <p className="text-sm font-semibold mt-0.5">{fmtOverdue(ticket.overdueBy)}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[11px] opacity-70">Deadline was</p>
            <p className="text-xs font-semibold">{fmt(ticket.slaDeadline)}</p>
          </div>
        </div> */}
 
        {/* Info grid */}
        <div className="grid grid-cols-2 gap-4">
          <InfoBlock label="Submitted By">
            <div className="flex items-center gap-2 mt-1">
              {/* <Avatar initials={ticket.submittedBy.split(" ").map(w => w[0]).join("").slice(0,2)} /> */}
              <div>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{ticket.requester}</p>
              </div>
            </div>
          </InfoBlock>
          <InfoBlock label="Assigned To">
            <div className="flex items-center gap-2 mt-1">
              {/* <Avatar initials={ticket.assignedTo.split(" ").map(w => w[0]).join("").slice(0,2)} /> */}
              <div>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{ticket.assigned_user}</p>
              </div>
            </div>
          </InfoBlock>
          <InfoBlock label="Date Submitted">
            <p className="text-sm font-semibold text-slate-700 mt-1">{fmt(ticket.created_at)}</p>
          </InfoBlock>
          {ticket.completed_at && (
            <InfoBlock label="Resolved At">
              <p className="text-sm font-semibold text-emerald-600 mt-1">{fmt(ticket.completed_at)}</p>
            </InfoBlock>
          )}
        </div>
      </div>
    </div>
  );
}
 
function InfoBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      {children}
    </div>
  );
}

function MissedSlaList({ tickets, showMissedTickets, onClose }: Props) {
  console.log(showMissedTickets);
  const [selected, setSelected] = useState<SelectedTicket | null>(null)

  const handleSelect = async(ticket: Ticket) => {
    const sticket = await config.get(`/inbox/${ticket.id}`);
    setSelected(sticket.data);
    console.log(sticket.data);
  }

  return (
    <div className={`fixed top-0 left-0 pl-16 flex items-center justify-center z-50 w-screen h-screen bg-gray-900/30 transition-all duration-300 ${showMissedTickets ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className={`w-9/10 h-9/10 bg-white rounded-lg transition-all duration-300 ${showMissedTickets ? "scale-100" : "scale-0 translate-y-full"}`}>
        <div className="w-full h-full flex flex-col">
            {/* ── Modal header ───────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <span className="text-base">🚨</span>
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Missed SLA Tickets</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-lg leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* ── Body: list + detail ────────────────────────────────────────── */}
            <div className="flex flex-1 min-h-0">
    
              {/* Left: list */}
              <div className="w-80 shrink-0 flex flex-col border-r border-slate-100">
    
                {/* Ticket list */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                  {tickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-2 text-center px-4">
                      <span className="text-2xl">🔍</span>
                      <p className="text-sm font-semibold text-slate-500">No tickets found</p>
                    </div>
                  ) : (
                    tickets.map(ticket => {
                      const isSelected = selected?.id === ticket.id;
                      return (
                        <button
                          key={ticket.id}
                          onClick={() => handleSelect(ticket)}
                          className={`w-full text-left px-4 py-3.5 transition-all border-l-4 hover:bg-slate-50 ${
                            isSelected
                              ? "bg-indigo-50 border-l-indigo-500"
                              : "border-l-transparent"
                          }`}
                        >
                          {/* Ticket ID + priority */}
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-mono text-[10px] text-slate-400">{ticket.ticket_number}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700`}>
                              {fmt(ticket.created_at)}
                            </span>
                          </div>
                          {/* Title */}
                          <p className={`text-xs font-semibold leading-snug line-clamp-2 mb-2 ${isSelected ? "text-indigo-900" : "text-slate-700"}`}>
                            {ticket.subject}
                          </p>
                          {/* Overdue badge + status */}
                          <div className="flex items-center justify-between gap-2">
                            {/* <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${OVERDUE_COLOR(ticket.overdueBy)}`}>
                              {fmtOverdue(ticket.overdueBy)}
                            </span> */}
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${STATUS_STYLES[ticket.status]}`}>
                              {ticket.status}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
    
              {/* Right: detail */}
              <div className="flex-1 min-w-0">
                {selected ? (
                  <TicketDetail ticket={selected} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
                    <span className="text-4xl">👈</span>
                    <p className="font-semibold text-slate-600">Select a ticket</p>
                    <p className="text-sm text-slate-400">Click any ticket from the list to view its full details.</p>
                  </div>
                )}
              </div>
    
            </div>
          </div>
        </div>
      </div>
  )
}

export default MissedSlaList