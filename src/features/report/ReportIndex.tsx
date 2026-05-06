import { useEffect, useState } from "react";
import config from "../../config/config";
import { useSearchParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import DetailPanel from "./_components/DetailPanel";
import TicketList from "./_components/TicketList";
import StatCards from "./_components/StatCards";
import FilterPanel from "./_components/FilterPanel";
import Analytics from "./_components/Analytics";
// import Analytics from "./_components/Analytics";

interface Counts {
    all: number;
    pending: number;
    in_progress: number;
    needs_feedback: number;
    closed: number;
}
export interface Ticket {
    id: number;
    ticket_number: string;
    category: string;
    subject: string;
    status: "pending" | "in_progress" | "needs_feedback" | "closed";
    requester: string;
    created_at: string;
		completed_at: string;
    completed_by: string;
		rating: number | null;
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

 
function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
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

    const [showAnalytics, setShowAnalytics] = useState<boolean>(false);

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
    const hasActiveFilters = search || filterStatus || filterCategory || filterResolvedBy !== "all";

    // Pagination
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);

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

    const clearFilters = () => {
        setSearch("");
        setFilterStatus("");
        setFilterCategory("");
        setFilterResolvedBy("");
        setFilterDateFrom(today);
        setFilterDateTo(today);
    }

    // CSV Export
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
        <div className={`h-screen bg-slate-50 font-sans pl-16 ${showAnalytics ? "overflow-hidden" : "overflow-auto"}`}>
            {	loading && <LoadingPage />}

            {/* {<Analytics />  } */}
						{
							showAnalytics && (
								<Analytics tickets={tickets} closeAnalytics={()=> setShowAnalytics(false)}/>
							)
						}
 
            {/* Header */}
            <header className="text-[#212121] px-8 py-5 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Ticket Reports</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm pt-1">Last updated: {fmt(new Date().toISOString())}</span>
                    <button onClick={handleDownload} className="bg-[#212121] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#181818] transition-colors cursor-pointer">
                        Export CSV
                    </button>
                </div>
            </header>
        
            <main className="px-8 py-6 max-w-screen-2xl mx-auto space-y-6">
        
                {/* Stat Cards */}
								<StatCards counts={counts} />
        
                {/* Filter Panel */}
                <FilterPanel 
									categories={categories} 
									resolvers={resolvers} 
									search={search} setSearch={setSearch}
									filterStatus={filterStatus} setFilterStatus={setFilterStatus}
									filterCategory={filterCategory} setFilterCategory={setFilterCategory}
									filterResolvedBy={filterResolvedBy} setFilterResolvedBy={setFilterResolvedBy}
									filterDateFrom={filterDateFrom} setFilterDateFrom={setFilterDateFrom}
									filterDateTo={filterDateTo} setFilterDateTo={setFilterDateTo}
									hasActiveFilters={hasActiveFilters}
									clearFilters={clearFilters}
									setSearchParams={setSearchParams}	
									setShowAnalytics={() => setShowAnalytics(true)}
								/>
        
                {/* Table + Detail Panel */}
                <div className="flex gap-4 items-start">
        
									{/* Table */}
										<TicketList tickets={tickets} selectedTicket={selectedTicket} setSelectedTicketId={(id) => setSelectedTicketId(id)} />
            
                    {/* Detail Panel */}
                    {
                        selectedTicket && (
                            <DetailPanel selectedTicket={selectedTicket} setSelectedTicket={() => setSelectedTicket(null)} />
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export default ReportIndex