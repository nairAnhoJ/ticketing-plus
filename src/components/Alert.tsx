interface AlertProps {
    title: string;
    description: string;
}

function Alert({ title, description }: AlertProps) {
  return (
    <div className='w-90 absolute top-4 left-[calc(50%+32px)] -translate-x-1/2 bg-emerald-600/10 border border-emerald-500 rounded-xl p-3'>
        <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-emerald-500 lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <p className="ml-2 text-sm font-bold">{title}</p>
        </div>
        <p className="ml-8 text-xs">{description}</p>
    </div>
  )
}

export default Alert