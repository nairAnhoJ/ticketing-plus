function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 ${className}`}>
      <div>
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
      {
        title === "Satisfaction Rating" && (
          <div className="w-full flex">
            <div className="w-1/2">
              
            </div>
            <div className="w-1/2">
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ChartCard