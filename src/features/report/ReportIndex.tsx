import { useState } from "react";

interface Counts {
    all: number;
    pending: number;
    in_progress: number;
    needs_feedback: number;
    closed: number;
}
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
type Status = "pending" | "in_progress" | "needs_feedback" | "closed";

// Helpers
const statusColors: Record<Status, string> = {
    pending: "bg-red-100 text-red-700 border border-red-200",
    in_progress: "bg-amber-100 text-amber-700 border border-amber-200",
    needs_feedback: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    closed: "bg-slate-100 text-slate-600 border border-slate-200",
};

const statusDotColors: Record<Status, string> = {
    pending: "bg-red-500",
    in_progress: "bg-amber-500",
    needs_feedback: "bg-emerald-500",
    closed: "bg-slate-400",
};

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
 
function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit" });
}

const formatStatus = (status: string) => {
  return status
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white text-slate-700 text-sm px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer shadow-sm"
      >
        <option value="">All</option>
        {options.map((o) => <option key={o} value={o}>{formatStatus(o)}</option>)}
      </select>
    </div>
  );
}

function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white text-slate-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent shadow-sm"
      />
    </div>
  );
}


function ReportIndex() {
    const today = new Date().toISOString().split("T")[0];
    const [counts, setCounts] = useState<Counts>({
        all: 0,
        pending: 0,
        in_progress: 0,
        needs_feedback: 0,
        closed: 0
    })
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [selectedTicket, setSelectedTicket] = useState<SelectedTicket | null>(null)

    // Filters
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterCategory, setFilterCategory] = useState<string>("");
    const [filterResolvedBy, setFilterResolvedBy] = useState<string>("");
    const [filterDateFrom, setFilterDateFrom] = useState<string>(today);
    const [filterDateTo, setFilterDateTo] = useState<string>(today);
    const [activeTab, setActiveTab] = useState<string>("All");
    const hasActiveFilters = search || filterStatus || filterCategory || filterResolvedBy || activeTab !== "All";

    // Pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Options
    const statuses: string[] = ['pending', 'in_progress', 'needs_feedback', 'closed']
    const [categories, setCategories] = useState([])
    const [resolvers, setResolvers] = useState([])

    const handleSelectTicket = (id: number) => {

    }

    const clearFilters = () => {

    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans pl-16">
            {/* Header */}
            <header className="text-[#212121] px-8 py-5 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Ticket Reports</h1>
                    {/* <p className="text-slate-400 text-sm mt-0.5">All support requests and their current status</p> */}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm pt-1">Last updated: {fmt(new Date().toISOString())}</span>
                    <button className="bg-[#212121] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#181818] transition-colors cursor-pointer">
                        Export CSV
                    </button>
                </div>
            </header>
        
            <main className="px-8 py-6 max-w-screen-2xl mx-auto space-y-6">
        
                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <StatCard label="All Tickets" count={counts.all} colorClass="bg-white border-slate-200 text-slate-800" dotColor="bg-slate-800" />
                    <StatCard label="Pending" count={counts.pending} colorClass="bg-red-50 border-red-200 text-red-800" dotColor="bg-red-500" />
                    <StatCard label="In-Progress" count={counts.in_progress} colorClass="bg-amber-50 border-amber-200 text-amber-800" dotColor="bg-amber-500" />
                    <StatCard label="Needs Feedback" count={counts.needs_feedback} colorClass="bg-emerald-50 border-emerald-200 text-emerald-800" dotColor="bg-emerald-500" />
                    <StatCard label="Closed" count={counts.closed} colorClass="bg-slate-100 border-slate-200 text-slate-700" dotColor="bg-slate-400" />
                </div>
        
                {/* Filter Panel */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Filters</h2>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-xs text-slate-500 hover:text-slate-900 underline underline-offset-2 transition-colors">
                                Clear all filters
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="col-span-3 sm:col-span-3 lg:col-span-2 flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Search</label>
                            <input
                                type="text"
                                placeholder="Ticket ID, subject, or name..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="rounded-xl border border-slate-200 bg-white text-slate-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent shadow-sm"
                            />
                        </div>

                        <FilterSelect label="Status" value={filterStatus} onChange={v => { setFilterStatus(v); setPage(1); }} options={statuses} />
                        <FilterSelect label="Category" value={filterCategory} onChange={v => { setFilterCategory(v); setPage(1); }} options={categories} />
                        <FilterSelect label="Resolved By" value={filterResolvedBy} onChange={v => { setFilterResolvedBy(v); setPage(1); }} options={resolvers} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        <DateInput label="From Date" value={filterDateFrom} onChange={v => { setFilterDateFrom(v); setPage(1); }} />
                        <DateInput label="To Date" value={filterDateTo} onChange={v => { setFilterDateTo(v); setPage(1); }} />
                        <button className=" h-9.5 bg-[#212121] hover:bg-[#181818] text-white rounded-xl self-end text-sm font-semibold cursor-pointer">Generate</button>
                    </div>
                </div>
        
                {/* Tab Bar */}
                <div className="flex items-center gap-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 w-fit">
                    {
                        (["All", ...statuses] as (Status | "All")[]).map(tab => (
                            <button key={tab} onClick={() => { setActiveTab(tab); setPage(1); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${activeTab === tab ? "bg-[#212121] text-white shadow" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}>
                                {
                                    tab !== "All" && <span className={`w-2 h-2 rounded-full ${statusDotColors[tab]}`} />
                                    // tab !== "All" && <span className={`w-2 h-2 rounded-full ${activeTab === tab ? "bg-white/60" : statusDotColors[tab]}`} />
                                }
                                    {formatStatus(tab)}
                                <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                                    {tab === "All" ? counts.all : counts[tab]}
                                </span>
                            </button>
                        ))
                    }
                </div>
        
                {/* Table + Detail Panel */}
                <div className="flex gap-4 items-start">
        
                    {/* Table */}
                    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <span className="text-sm font-semibold text-slate-700">
                                Showing <span className="text-slate-900">{filtered.length}</span> ticket{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div> */}
            
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap">Ticket ID</th>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider">Subject</th>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider">Category</th>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-500 uppercase text-xs tracking-wider whitespace-nowrap">Status</th>
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
                                            <tr key={ticket.id} onClick={() => handleSelectTicket(ticket.id)} className={`cursor-pointer transition-colors hover:bg-slate-50 ${selectedTicket?.id === ticket.id ? "bg-slate-50 border-l-4 border-l-slate-900" : "border-l-4 border-l-transparent"}`}>
                                                <td className="px-4 py-3 font-mono text-xs text-slate-500 whitespace-nowrap">{ticket.ticket_number}</td>
                                                <td className="px-4 py-3 text-slate-800 font-medium max-w-xs truncate">{ticket.subject}</td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded-lg">{ticket.category}</span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusColors[ticket.status]}`}>{ticket.status}</span>
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
            
                        {/* Pagination */}
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
                        )} */}
                    </div>
            
                    {/* Detail Panel */}
                    {
                        selectedTicket && (
                        <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-4">
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                                <span className="font-bold text-slate-800 text-sm">Ticket Details</span>
                                <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-700 text-lg leading-none transition-colors">×</button>
                            </div>
            
                            <div className="p-5 space-y-4">
                                {/* ID + Status */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono text-xs text-slate-500">{selectedTicket.id}</span>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
                                </div>
                
                                {/* Title */}
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-snug">{selectedTicket.status}</h3>
                                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">{selectedTicket.description}</p>
                                </div>
                
                                {/* Badges */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg">{selectedTicket.category}</span>
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
                                                {(() => {
                                                    const diff = new Date(selectedTicket.completed_at).getTime() - new Date(selectedTicket.requested_at).getTime();
                                                    const hrs = Math.floor(diff / 3600000);
                                                    const mins = Math.floor((diff % 3600000) / 60000);
                                                    return hrs > 24 ? `${Math.floor(hrs / 24)}d ${hrs % 24}h` : `${hrs}h ${mins}m`;
                                                })()}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default ReportIndex