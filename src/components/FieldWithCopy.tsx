import type { LnData } from "../features/create/_components/LnForm";

interface Props {
	label: string;
	value?: string | number | null;
	field: keyof LnData;
	copied: string;
	onCopy: (field: keyof LnData) => void;
    canCopy?: boolean;
}

function FieldWithCopy({ label, value, field, copied, onCopy, canCopy = true} : Props) {
    return (
        <div className="flex flex-col mt-3 relative">
            <label className="text-sm">{label}</label>
            <input type="text" value={value || ' '} readOnly className="leading-4 rounded bg-white text-sm border border-neutral-400 p-2 pr-7 overflow-hidden whitespace-pre-wrap focus:outline-none"/>
            {
                canCopy &&
                <button type="button" onClick={() => onCopy(field)} className="absolute top-6 right-1 p-1 rounded text-neutral-600 bg-white hover:bg-neutral-200 cursor-pointer">
                    {
                        copied === field ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    }
                </button>
            }
        </div>
    )
}

export default FieldWithCopy