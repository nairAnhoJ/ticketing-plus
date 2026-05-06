import type { Ticket } from "../ReportIndex"
import KpiCards from "./KpiCards";

interface Props {
		tickets: Ticket[];
		closeAnalytics: () => void;
}

function Analytics({ tickets, closeAnalytics } : Props) {
  return (
    <div className="fixed top-0 left-0 pl-16 w-full h-screen overflow-y-auto bg-slate-50 z-9">
			{/* Header */}
      <header className="text-[#212121] px-8 py-5 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Analytics & Charts</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={closeAnalytics} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </button>
        </div>
      </header>

      <main className="px-8 py-6 max-w-screen-2xl mx-auto space-y-6">
				{/* KPI Cards */}
				<KpiCards tickets={tickets} />
			</main>
    </div>
  )
}

export default Analytics