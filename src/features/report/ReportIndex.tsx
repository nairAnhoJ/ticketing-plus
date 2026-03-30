import { useEffect, useState } from "react";
import config from "../../config/config";
import { useSearchParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import Analytics from "./_components/Analytics";

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
interface Option {
    id: Status;
    name: string;
}
type Status = "all" | "pending" | "in_progress" | "needs_feedback" | "closed";

// Helpers
const statusColors: Record<Status, string> = {
    all: "",
    pending: "bg-red-100 text-red-700 border border-red-200",
    in_progress: "bg-amber-100 text-amber-700 border border-amber-200",
    needs_feedback: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    closed: "bg-slate-100 text-slate-600 border border-slate-200",
};

// const statusDotColors: Record<Status, string> = {
//     all: "",
//     pending: "bg-red-500",
//     in_progress: "bg-amber-500",
//     needs_feedback: "bg-emerald-500",
//     closed: "bg-slate-400",
// };

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

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Option[] }) {
  return (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white text-slate-700 text-sm px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent appearance-none cursor-pointer shadow-sm">
                <option value="">All</option>
                {options.map((o) => <option key={o.id} value={o.id}>{(o.name)}</option>)}
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
        className="rounded-xl border border-slate-300 bg-white text-slate-700 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent shadow-sm"
      />
    </div>
  );
}


function ReportIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const today = new Date().toISOString().split("T")[0];
    const [counts, setCounts] = useState<Counts>({
        all: 0,
        pending: 0,
        in_progress: 0,
        needs_feedback: 0,
        closed: 0
    })
    const [loading, setLoading] = useState<boolean>(false);

    const [tickets, setTickets] = useState<Ticket[]>([])
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)
    const [selectedTicket, setSelectedTicket] = useState<SelectedTicket | null>(null)

    // Filters
    const [search, setSearch] = useState<string>(searchParams.get("search") || "");
    const [filterStatus, setFilterStatus] = useState<string>(searchParams.get("status") || "");
    const [filterCategory, setFilterCategory] = useState<string>(searchParams.get("category") || "");
    const [filterResolvedBy, setFilterResolvedBy] = useState<string>(searchParams.get("resolvedBy") || "");
    const [filterDateFrom, setFilterDateFrom] = useState<string>(searchParams.get("dateFrom") || today);
    const [filterDateTo, setFilterDateTo] = useState<string>(searchParams.get("dateTo") || today);
    // const [activeTab, setActiveTab] = useState<string>("all");
    const hasActiveFilters = search || filterStatus || filterCategory || filterResolvedBy !== "all";

    // Pagination
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);

    // Options
    const statuses: Option[] = [
        {id:'pending', name: 'Pending' },
        {id:'in_progress', name: 'In Progress' },
        {id:'needs_feedback', name: 'Needs Feedback' },
        {id:'closed', name: 'Closed' }
    ]
    const [categories, setCategories] = useState<Option[]>([])
    const [resolvers, setResolvers] = useState<Option[]>([])

    useEffect(()=>{
        setLoading(true)
        config.get("/ticket-report", {
                params: {
                    search: search,
                    status: filterStatus,
                    category: filterCategory,
                    resolvedBy: filterResolvedBy,
                    dateFrom: filterDateFrom,
                    dateTo: filterDateTo,
                }
            })
            .then((res)=>{

                // TicketCounts
                setCounts({
                    all: res.data.tickets.length,
                    pending: res.data.ticketCount.pending,
                    in_progress:  res.data.ticketCount.in_progress,
                    needs_feedback:  res.data.ticketCount.needs_feedback,
                    closed:  res.data.ticketCount.closed
                })

                // Tickets
                setTickets(res.data.tickets);

                // Ticket Categories
                const newCategories = res.data.categories.map((cat: any) => ({
                    id: cat.id,
                    name: cat.name
                }));
                setCategories(newCategories);

                // Resolvers
                setResolvers(res.data.resolvers);

                // Select
                // if(res.data.tickets.length > 0){
                //     console.log(res.data.tickets.length);
                //     setSelectedTicketId(res.data.tickets[0].id)
                // }
                setSelectedTicketId(null)
                setSelectedTicket(null)
            })
            .catch((err)=>console.log(err))
            .finally(()=>setLoading(false))
    }, [searchParams])

    useEffect(()=>{
        if(tickets.length > 0){
            fetchTicket();
        }
    }, [selectedTicketId])

    const fetchTicket = () => {
        try {
            config.get(`inbox/${selectedTicketId}`)
                .then((res)=>{
                    setSelectedTicket({
                        id: res.data.id,
                        ticket_number: res.data.ticket_number,
                        category: res.data.ticket_category,
                        subject: res.data.subject,
                        description: res.data.description,
                        status: res.data.status,
                        requester: res.data.requester,
                        requested_at: res.data.created_at,
                        created_at: res.data.created_at,
                        completed_by: res.data.completed_by,
                        completed_at: res.data.completed_at,
                    })
                })
                .catch((err)=>console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    const handleGenerate = () => {
        const params = {
            search: search,
            status: filterStatus,
            category: filterCategory,
            resolvedBy: filterResolvedBy,
            dateFrom: filterDateFrom,
            dateTo: filterDateTo,
        };

        const filteredParams: Record<string, string> = {};

        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                filteredParams[key] = value;
            }
        });

        setSearchParams(filteredParams);
    }

    const clearFilters = () => {
        setSearch("");
        setFilterStatus("");
        setFilterCategory("");
        setFilterResolvedBy("");
        setFilterDateFrom(today);
        setFilterDateTo(today);
    }

    const convertToCSV = () => {
        if (!tickets.length) return "";
        const headers = Object.keys(tickets[0]) as (keyof Ticket)[];

        const rows = tickets.map(obj =>
            headers.map(header => JSON.stringify(obj[header] ?? "")).join(",")
        );

        return [headers.join(","), ...rows].join("\n");
    };

    const downloadCSV = (csv: any, filename = "data.csv") => {
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownload = () => {
        const now = new Date();

        const pad = (n: number) => n.toString().padStart(2, "0");

        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const year = now.getFullYear();

        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        const csv = convertToCSV();
        downloadCSV(csv, `ticket_report_${month}-${day}-${year}_${hours}-${minutes}-${seconds}.csv`);
    };


    return (
        <div className="min-h-screen bg-slate-50 font-sans pl-16">
            {loading && <LoadingPage />}
            {/* {<Analytics />  } */}

            {/* Header */}
            <header className="text-[#212121] px-8 py-5 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Ticket Reports</h1>
                    {/* <p className="text-slate-400 text-sm mt-0.5">All support requests and their current status</p> */}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm pt-1">Last updated: {fmt(new Date().toISOString())}</span>
                    <button onClick={handleDownload} className="bg-[#212121] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#181818] transition-colors cursor-pointer">
                        Export CSV
                    </button> 
                    {/* <button className="bg-[#212121] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#181818] transition-colors cursor-pointer">
                        View Analytics and Charts
                    </button> */}
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
                <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Filters</h2>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-xs text-slate-500 hover:text-slate-900 underline underline-offset-2 transition-colors">
                                Clear all filters
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="col-span-3 sm:col-span-3 lg:col-span-2 flex flex-col gap-1 relative">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Search</label>
                            <input
                                type="text"
                                placeholder="Ticket ID, subject, or name..."
                                value={search}
                                onChange={e => { setSearch(e.target.value); }}
                                className="rounded-xl border border-slate-300 bg-white text-slate-700 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent shadow-sm"
                            />
                            <button onClick={()=>setSearch('')} className="hover:bg-red-500 hover:text-white absolute right-1.25 bottom-1.25 p-0.5 text-red-500 rounded-[10px] cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                </svg>
                            </button>
                        </div>

                        <FilterSelect label="Status" value={filterStatus} onChange={v => { setFilterStatus(v); }} options={statuses} />
                        <FilterSelect label="Category" value={filterCategory} onChange={v => { setFilterCategory(v); }} options={categories} />
                        <FilterSelect label="Resolved By" value={filterResolvedBy} onChange={v => { setFilterResolvedBy(v); }} options={resolvers} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                        <DateInput label="From Date" value={filterDateFrom} onChange={v => { setFilterDateFrom(v); }} />
                        <DateInput label="To Date" value={filterDateTo} onChange={v => { setFilterDateTo(v); }} />
                        <button onClick={handleGenerate} className=" h-9.5 bg-[#212121] hover:bg-[#181818] text-white rounded-xl self-end text-sm font-semibold cursor-pointer">Generate</button>
                    </div>
                </div>
        
                {/* Tab Bar */}
                {/* <div className="flex items-center gap-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-1.5 w-fit">
                    {
                        ([{id: "all", name: "All"}, ...statuses] as Option[]).map(tab => (
                            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setPage(1); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center gap-2 ${activeTab === tab.id ? "bg-[#212121] text-white shadow" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}>
                                {
                                    tab.id !== "all" && <span className={`w-2 h-2 rounded-full ${statusDotColors[tab.id]}`} />
                                }
                                    {tab.name}
                                <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                                    {tab.id === "all" ? counts.all : counts[tab.id]}
                                </span>
                            </button>
                        ))
                    }
                </div> */}
        
                {/* Table + Detail Panel */}
                <div className="flex gap-4 items-start">
        
                    {/* Table */}
                    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
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
                                    <span className="font-mono text-xs text-slate-500">{selectedTicket.ticket_number}</span>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
                                </div>
                
                                {/* Badges */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg">{selectedTicket.category}</span>
                                </div>
                
                                {/* Title */}
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-snug">{selectedTicket.status}</h3>
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