import { useEffect, useState } from "react";


interface Department {
  id: number;
  name: string;
}

function TicketManager() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [inChargeDepartments, setInChargeDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setDepartments([{'id': 1, 'name': 'General'}, {'id': 2, 'name': 'IT'}, {'id': 3, 'name': 'HR'}]);
    setInChargeDepartments([{'id': 1, 'name': 'General'}]);
  }, []);

  return (
    <div className="space-y-4">
      <div className="">
        <h2 className="text-base font-bold text-slate-400 uppercase tracking-widest">Ticket Manager</h2>
        {/* <p className="text-sm text-slate-500 mt-1">{description}</p> */}
      </div>
        <div className="grid grid-cols-2 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
          {/* ── Left panel: Available ── */}
          <div className="flex flex-col border-r border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Available Departments</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Click a row to enable ticket management</p>
              </div>
              <span className="text-xs font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                {departments.length}
              </span>
            </div>

            {/* Rows */}
            <div className="flex-1 divide-y divide-slate-50 min-h-64">
              {departments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 gap-2 text-center px-4">
                  <span className="text-2xl">✅</span>
                  <p className="text-sm font-semibold text-slate-500">All departments enabled</p>
                  <p className="text-xs text-slate-400">No available departments left to add.</p>
                </div>
              ) : (
                departments.map(dept => (
                  inChargeDepartments.some((d) => d.id !== dept.id) &&
                  <button key={dept.id}
                    // onClick={() => toggleDept(dept.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-1.5 text-left hover:bg-indigo-50 hover:border-l-2 hover:border-l-indigo-400 transition-all group"
                  >
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0`}>
                      {dept.name}
                    </span>
                    {/* <span className="text-xs text-slate-400 flex-1">
                      {dept.categories.length} {dept.categories.length === 1 ? "category" : "categories"}
                    </span> */}
                    <span className="text-slate-300 group-hover:text-indigo-500 text-sm transition-colors">→</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ── Right panel: Enabled ── */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 border-b border-slate-200">
              <div>
                <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Managing Tickets</p>
                <p className="text-[11px] text-indigo-400 mt-0.5">Click a row to remove ticket access</p>
              </div>
              <span className="text-xs font-bold bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
                {inChargeDepartments.length}
              </span>
            </div>

            {/* Rows */}
            <div className="flex-1 divide-y divide-slate-50 min-h-64">
              {inChargeDepartments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 gap-2 text-center px-4">
                  <span className="text-2xl">👈</span>
                  <p className="text-sm font-semibold text-slate-500">No departments enabled</p>
                  <p className="text-xs text-slate-400">Click a department on the left to add it here.</p>
                </div>
              ) : (
                inChargeDepartments.map(dept => (
                  <div key={dept.id} className="flex items-center justify-between gap-3 px-4 py-1.5 group hover:bg-red-50 transition-all">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0`}>
                      {dept.name}
                    </span>
                    {/* <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500">
                        {dept.categories.filter(c => c.isActive).length} active
                        {" / "}
                        {dept.categories.length} {dept.categories.length === 1 ? "category" : "categories"}
                      </p>
                    </div> */}
                    {/* Remove button */}
                    {/* <button
                      onClick={() => setConfirmRemove(dept.id)}
                      title="Remove department"
                      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-base leading-none flex-shrink-0"
                    >
                      ✕
                    </button> */}
                    <button
                      // onClick={() => toggleDept(dept.id)}
                      title="Disable ticket management"
                      className="text-slate-300 hover:text-red-500 transition-colors text-sm shrink-0"
                    >
                      ←
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-3 border-t border-slate-200 bg-indigo-50/40">
              <p className="text-[11px] text-indigo-400">
                Enabled departments appear on ticket forms and in reports.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TicketManager