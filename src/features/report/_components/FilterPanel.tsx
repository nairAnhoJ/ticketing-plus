
type Status = "all" | "pending" | "in_progress" | "needs_feedback" | "closed";

interface Option {
    id: Status;
    name: string;
}

interface Props {
	categories: Option[];
	resolvers: Option[];
	search: string; setSearch: (v: string) => void;
	filterStatus: string; setFilterStatus: (v: string) => void;
	filterCategory: string; setFilterCategory: (v: string) => void;
	filterResolvedBy: string; setFilterResolvedBy: (v: string) => void;
	filterDateFrom: string; setFilterDateFrom: (v: string) => void;
	filterDateTo: string; setFilterDateTo: (v: string) => void;
	hasActiveFilters: string | boolean; clearFilters: () => void;
	setSearchParams: (params: Record<string, string>) => void;
	setShowAnalytics: () => void;
}

// Options
const statuses: Option[] = [
		{id:'pending', name: 'Pending' },
		{id:'in_progress', name: 'In Progress' },
		{id:'needs_feedback', name: 'Needs Feedback' },
		{id:'closed', name: 'Closed' }
]

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

function FilterPanel({ 
	categories, 
	resolvers, 
	search, setSearch, 
	filterStatus, setFilterStatus, 
	filterCategory, setFilterCategory,
	filterResolvedBy, setFilterResolvedBy,
	filterDateFrom, setFilterDateFrom,
	filterDateTo, setFilterDateTo,
	hasActiveFilters, clearFilters,
	setSearchParams,
	setShowAnalytics
}: Props) {

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

  return (
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
						<button onClick={setShowAnalytics} className=" h-9.5 bg-[#212121] hover:bg-[#181818] text-white rounded-xl self-end text-sm font-semibold cursor-pointer">View Analytics and Charts</button>
				</div>
		</div>
  )
}

export default FilterPanel