import { useState } from "react";
import type { LnData } from "../features/create/_components/LnForm";
import FieldWithCopy from "./FieldWithCopy";

interface Props {
    lnTicket?: LnData | null;
	ticket_number?: string;
	subject?: string;
	description?: string;
    close: () => void;
}

function LnFormModal({ lnTicket, ticket_number, subject, description, close } : Props) {
	const [copied, setCopied] = useState<string>('');


	const handleCopy = async (ln_url: keyof LnData) => {
		try {
			await navigator.clipboard.writeText(lnTicket?.[ln_url]?.toString() || '');
			setCopied(ln_url);

			setTimeout(() => {
				setCopied('');
			}, 3000);
		} catch (error) {
			console.error('Error copying to clipboard:', error);
		}
	};

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-neutral-900/50 flex items-center justify-center">
			<div className="w-[65%] h-4/5 bg-neutral-100 rounded-lg">
				<div className="flex items-center justify-end border-b border-neutral-200 p-3">
					{/* <h1 className="font-bold text-lg">Customers</h1> */}
					<button type="button" onClick={close} className="p-1 rounded text-neutral-700 hover:bg-neutral-100 cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					</button>
				</div>
				<div className="h-[calc(100%-62px)] flex flex-col gap-y-1 p-6 text-neutral-600 overflow-y-scroll">
					<div className="">
						<div className="leading-3 font-bold">{ticket_number}</div>
					</div>
					<div className="mt-2">
						{/* <label className="text-sm">Subject</label> */}
						<div className="leading-3 font-semibold">{subject}</div>
					</div>
					<div className="mt-2">
						{/* <label className="text-sm">Body</label> */}
						<div className="leading-3 whitespace-pre-wrap">{description}</div>
					</div>

					{/* BP Code and Type */}
					<div className="grid grid-cols-2 gap-x-3">
						<FieldWithCopy label="BP Code" value={lnTicket?.bp_code} field="bp_code" copied={copied} onCopy={handleCopy} />
						<FieldWithCopy label="Type" value={lnTicket?.type} field="type" copied={copied} onCopy={handleCopy} canCopy={false} />
					</div>

					<div className="grid grid-cols-1 gap-x-3">
						<FieldWithCopy label="Name" value={lnTicket?.name} field="name" copied={copied} onCopy={handleCopy} />
					</div>

					<div className="grid grid-cols-1 gap-x-3">
						<FieldWithCopy label="Billing Address" value={lnTicket?.billing_address} field="billing_address" copied={copied} onCopy={handleCopy} />
					</div>

					<div className="grid grid-cols-1 gap-x-3">
						<FieldWithCopy label="Shipping Address" value={lnTicket?.shipping_address} field="shipping_address" copied={copied} onCopy={handleCopy} />
					</div>
					
					{/* TIN and Business Style */}
					<div className="grid grid-cols-2 gap-x-3">
						<FieldWithCopy label="TIN" value={lnTicket?.tin} field="tin" copied={copied} onCopy={handleCopy} />
						<FieldWithCopy label="Business Style" value={lnTicket?.style} field="style" copied={copied} onCopy={handleCopy} />
					</div>

					{/* Sales Employee and Withholding Tax Code */}
					<div className="grid grid-cols-2 gap-x-3">
						<FieldWithCopy label="Sales Employee" value={lnTicket?.sales_employee} field="sales_employee" copied={copied} onCopy={handleCopy} />
						<FieldWithCopy label="Withholding Tax Code" value={lnTicket?.wtax_code} field="wtax_code" copied={copied} onCopy={handleCopy} />
					</div>

					{/* Payment Terms and Checkboxes */}
					<div className="grid grid-cols-2 gap-x-3">
						<FieldWithCopy label="Payment Terms" value={lnTicket?.payment_terms} field="payment_terms" copied={copied} onCopy={handleCopy} />
						<div className="w-full flex pt-6">
							<div className="w-full flex items-center justify-center">
								<label>On Hold</label>
								<input type="checkbox" checked={lnTicket?.is_on_hold} readOnly className="ml-2"/>
							</div>
							<div className="w-full flex items-center justify-center">
								<label>Auto Email</label>
								<input type="checkbox" checked={lnTicket?.is_auto_email} readOnly className="ml-2"/>
							</div>
							<div className="w-full flex items-center justify-center">
								<label>EWT</label>
								<input type="checkbox" checked={lnTicket?.wtax_code !== null && lnTicket?.wtax_code !== undefined && lnTicket?.wtax_code !== ''} readOnly className="ml-2"/>
							</div>
						</div>
						{/* <FieldWithCopy label="Type" value={lnTicket?.type} field="type" copied={copied} onCopy={handleCopy} /> */}
					</div>

					{/* AR In-Charge and AR Email */}
					<div className="grid grid-cols-2 gap-x-3">
						<FieldWithCopy label="AR In-Charge" value={lnTicket?.ar_incharge} field="ar_incharge" copied={copied} onCopy={handleCopy} />
						<FieldWithCopy label="AR Email" value={lnTicket?.ar_email} field="ar_email" copied={copied} onCopy={handleCopy} />
					</div>

					{/* Contact 1*/}
					<div className="grid grid-cols-3 gap-x-3 mt-3 border border-neutral-400 p-3 rounded bg-white">
						<div className="col-span-4">
							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
								<h1 className="font-semibold">Contact 1</h1>
							</div>
						</div>
						<FieldWithCopy label="Name" value={lnTicket?.contact_name1} field="contact_name1" copied={copied} onCopy={handleCopy} />
						<FieldWithCopy label="Phone no." value={lnTicket?.contact_no1} field="contact_no1" copied={copied} onCopy={handleCopy} />
						<FieldWithCopy label="Email" value={lnTicket?.contact_email1} field="contact_email1" copied={copied} onCopy={handleCopy} />
					</div>

					{/* Contact 2*/}
					{
						(lnTicket?.contact_name2 || lnTicket?.contact_no2 || lnTicket?.contact_email2) &&
						<div className="grid grid-cols-3 gap-x-3 mt-3 border border-neutral-400 p-3 rounded bg-white">
							<div className="col-span-4">
								<div className="flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
									<h1 className="font-semibold">Contact 2</h1>
								</div>
							</div>
							<FieldWithCopy label="Name" value={lnTicket?.contact_name2} field="contact_name2" copied={copied} onCopy={handleCopy} />
							<FieldWithCopy label="Phone no." value={lnTicket?.contact_no2} field="contact_no2" copied={copied} onCopy={handleCopy} />
							<FieldWithCopy label="Email" value={lnTicket?.contact_email2} field="contact_email2" copied={copied} onCopy={handleCopy} />
						</div>
					}

					{/* Contact 3*/}
					{
						(lnTicket?.contact_name3 || lnTicket?.contact_no3 || lnTicket?.contact_email3) &&
						<div className="grid grid-cols-3 gap-x-3 mt-3 border border-neutral-400 p-3 rounded bg-white">
							<div className="col-span-4">
								<div className="flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
									<h1 className="font-semibold">Contact 3</h1>
								</div>
							</div>
							<FieldWithCopy label="Name" value={lnTicket?.contact_name3} field="contact_name3" copied={copied} onCopy={handleCopy} />
							<FieldWithCopy label="Phone no." value={lnTicket?.contact_no3} field="contact_no3" copied={copied} onCopy={handleCopy} />
							<FieldWithCopy label="Email" value={lnTicket?.contact_email3} field="contact_email3" copied={copied} onCopy={handleCopy} />
						</div>
					}

				</div>
			</div>
    </div>
  )
}

export default LnFormModal