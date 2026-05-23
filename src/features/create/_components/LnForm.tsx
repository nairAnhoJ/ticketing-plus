import { useEffect, useState } from "react";
import type { LnError } from "../createTicketSlice";
import CustomerBrowser from "./CustomerBrowser";
import config from "../../../config/config";

export interface LnData {
	type: string;
	bp_code: string;
	name: string;
	billing_address: string;
	shipping_address: string;
	tin: string;
	style: string;
	sales_employee: string;
	wtax_code: string;
	payment_terms: string;
	is_on_hold: boolean;
	is_auto_email: boolean;
	ar_incharge: string;
	ar_email: string;
	contact_name1: string;
	contact_no1: string;
	contact_email1: string;
	contact_name2: string;
	contact_no2: string;
	contact_email2: string;
	contact_name3: string;
	contact_no3: string;
	contact_email3: string;
}

interface Props {
	setLnData: React.Dispatch<React.SetStateAction<LnData>>
	lnData: LnData;
	setValue: any;
	lnErrors: LnError[];
	errors: any;
}

function LnForm({setLnData, lnData, setValue, lnErrors, errors}: Props) {
	const [subject, setSubject] = useState<string>('');
	const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0);
	// const [selectedCustomer, setSelectedCustomer] = useState<LnData>();
	const [showCustomer, setShowCustomer] = useState<boolean>(false);

	const fetchCustomerDetails = async () => {
		console.log(selectedCustomerId);
		try {
			const response = await config.get(`/ln-customers/${selectedCustomerId}`);
			console.log(response.data);
			setLnData(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if(selectedCustomerId !== 0){
			// fetch customer details and set to form
			fetchCustomerDetails();
		}
	}, [selectedCustomerId]);

	const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedSubject = e.target.value;

		if(selectedSubject === 'Add Account'){
			setLnData({
				type: '',
				bp_code: '',
				name: '',
				billing_address: '',
				shipping_address: '',
				tin: '',
				style: '',
				sales_employee: '',
				wtax_code: '',
				payment_terms: '',
				is_on_hold: false,
				is_auto_email: false,
				ar_incharge: '',
				ar_email: '',
				contact_name1: '',
				contact_no1: '',
				contact_email1: '',
				contact_name2: '',
				contact_no2: '',
				contact_email2: '',
				contact_name3: '',
				contact_no3: '',
				contact_email3: '',
			});
		}

		setSubject(selectedSubject);
		setValue('subject', selectedSubject);
	}

	return (
		<div>
			{showCustomer && <CustomerBrowser close={() => setShowCustomer(false)} setSelectedCustomerId={setSelectedCustomerId} />}

			<div className="flex flex-col mt-3">
				{/* Row 1 - Subject */}
				<div className="flex gap-x-3">
					<div className="flex flex-col flex-1">
						<label className="text-sm">Subject <span className="text-sm text-red-500">*</span></label>
						<select onChange={handleSubjectChange} className={`border bg-white ${errors.subject ? 'border-red-400' : 'border-neutral-400'} px-1 py-1 rounded focus:outline-0 disabled:opacity-60`}>
							<option className="hidden">Select an option</option>
							<option value={'Add Account'}>Add Account</option>
							<option value={'Update Account'}>Update Account</option>
							<option value={'Activate Account'}>Activate Account</option>
							<option value={'Deactivate Account'}>Deactivate Account</option>
							<option value={'Hold Account'}>Hold Account</option>
							<option value={'Lift Account'}>Lift Account</option>
						</select>
					</div>
					<div className="flex items-end">
						<button disabled={subject === 'Add Account' || subject === ''} onClick={() => setShowCustomer(true)} type="button" className="h-8.5 flex items-center gap-x-1 enabled:hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact-round-icon lucide-contact-round"><path d="M16 2v2"/><path d="M17.915 22a6 6 0 0 0-12 0"/><path d="M8 2v2"/><circle cx="12" cy="12" r="4"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>Browse existing customers</button>
					</div>
				</div>

				{/* Row 2 - Type & BP Code */}
				<div className="grid grid-cols-2 gap-x-3">
					<div className="flex flex-col mt-3">
						<label className="text-sm">Type <span className="text-sm text-red-500">*</span></label>
						<select onChange={(e)=>setLnData({...lnData, type: e.target.value})} value={lnData.type} className={`border bg-white ${lnErrors.some(err => err.path === 'type') ? 'border-red-500' : 'border-neutral-400'} px-1 py-1 rounded focus:outline-0`}>
								<option className="hidden">Select an option</option>
								<option value={'Customer'}>Customer</option>
								<option value={'Vendor'}>Vendor</option>
								<option value={'Employee'}>Employee</option>
						</select>
					</div>
					<div className="flex flex-col mt-3">
						<label className="text-sm">BP Code <span className="text-sm text-red-500">*</span></label>
						<input type="text" onChange={(e)=>setLnData({...lnData, bp_code: e.target.value})} value={lnData.bp_code} className={`border bg-white ${lnErrors.some(err => err.path === 'bp_code') ? 'border-red-500' : 'border-neutral-400'} px-1 py-1 rounded focus:outline-0`} />
						{(lnErrors.some(err => err.path === 'bp_code') && lnErrors.find(err => err.path === 'bp_code')?.message === 'already exists') && <p className="text-red-500 text-sm">Customer with this BP Code already exists</p>}
					</div>
				</div>

				{/* Row 3 - Name */}
				<div className="">
					<div className="flex flex-col mt-3">
						<label className="text-sm">Name <span className="text-sm text-red-500">*</span></label>
						<input type="text" onChange={(e)=>setLnData({...lnData, name: e.target.value})} value={lnData.name} className={`border bg-white ${lnErrors.some(err => err.path === 'name') ? 'border-red-500' : 'border-neutral-400'} px-1 py-1 rounded focus:outline-0`} />
					</div>
				</div>

				{/* Row 4 - Billing Address */}
				<div className="">
					<div className="flex flex-col mt-3">
						<label className="text-sm">Billing Address</label>
						<textarea rows={2} onChange={(e)=>setLnData({...lnData, billing_address: e.target.value})} value={lnData.billing_address} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0 resize-none" />
					</div>
				</div>

				{/* Row 5 - Shipping Address */}
				<div className="">
					<div className="flex flex-col mt-3">
						<label className="text-sm">Shipping Address</label>
						<textarea rows={2} onChange={(e)=>setLnData({...lnData, shipping_address: e.target.value})} value={lnData.shipping_address} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0 resize-none" />
					</div>
				</div>

				{/* Row 6 - TIN & Business Style */}
				<div className="grid grid-cols-2 gap-x-3">
					<div className="flex flex-col mt-3">
						<label className="text-sm">TIN</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, tin: e.target.value})} value={lnData.tin} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col mt-3">
						<label className="text-sm">Business Style</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, style: e.target.value})} value={lnData.style} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
				</div>

				{/* Row 7 - Sales Rep & WTax */}
				<div className="grid grid-cols-2 gap-x-3">
					<div className="flex flex-col mt-3">
						<label className="text-sm">Sales Employee</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, sales_employee: e.target.value})} value={lnData.sales_employee} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col mt-3">
						<label className="text-sm">Withholding Tax Code</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, wtax_code: e.target.value})} value={lnData.wtax_code} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
				</div>

				{/* Row 8 - Payment Terms & On Hold & Auto Email*/}
				<div className="grid grid-cols-2 gap-x-3">
					<div className="flex flex-col mt-3">
						<label className="text-sm">Payment Terms</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, payment_terms: e.target.value})} value={lnData.payment_terms} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex items-center w-full mt-5">
						<div className="bg-white grid grid-cols-2 w-full h-full border border-neutral-400 p-1 rounded">
							<div className="flex justify-center gap-x-2 items-center">
								<input type="checkbox" id="on-hold" onChange={(e)=>setLnData({...lnData, is_on_hold: e.target.checked})} checked={lnData.is_on_hold} />
								<label htmlFor="on-hold" className="text-sm">On Hold</label>
							</div>
							<div className="flex justify-center gap-x-2 items-center">
								<input type="checkbox" id="auto-email" onChange={(e)=>setLnData({...lnData, is_auto_email: e.target.checked})} checked={lnData.is_auto_email} />
								<label htmlFor="auto-email" className="text-sm">Auto Email</label>
							</div>
						</div>
					</div>
				</div>

				{/* Row 9 - AR In-Charge & AR Email*/}
				<div className="grid grid-cols-2 gap-x-3">
					<div className="flex flex-col mt-3">
						<label className="text-sm">AR In-Charge</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, ar_incharge: e.target.value})} value={lnData.ar_incharge} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col mt-3">
						<label className="text-sm">AR Email</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, ar_email: e.target.value})} value={lnData.ar_email} className="bg-white border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
				</div>

				{/* Row 10 - Contact 1*/}
				<div className="grid grid-cols-3 gap-3 mt-3 border border-neutral-400 p-3 rounded bg-white">
					<div className="col-span-4">
						<div className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
							<h1 className="font-semibold">Contact 1</h1>
						</div>
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Name</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_name1: e.target.value})} value={lnData.contact_name1} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Phone no.</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_no1: e.target.value})} value={lnData.contact_no1} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Email</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_email1: e.target.value})} value={lnData.contact_email1} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
				</div>

				{/* Row 11 - Contact 2*/}
				<div className="grid grid-cols-3 gap-3 mt-3 border border-neutral-400 p-3 rounded bg-white">
					<div className="col-span-4">
						<div className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
							<h1 className="font-semibold">Contact 2</h1>
							<p className="text-neutral-500 font-semibold text-xs bg-neutral-200 py-0.5 px-1.5 rounded-full ml-1">optional</p>
						</div>
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Name</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_name2: e.target.value})} value={lnData.contact_name2} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Phone no.</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_no2: e.target.value})} value={lnData.contact_no2} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Email</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_email2: e.target.value})} value={lnData.contact_email2} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
				</div>

				{/* Row 12 - Contact 3*/}
				<div className="grid grid-cols-3 gap-3 mt-3 border border-neutral-400 p-3 rounded bg-white">
					<div className="col-span-4">
						<div className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
							<h1 className="font-semibold">Contact 3</h1>
							<p className="text-neutral-500 font-semibold text-xs bg-neutral-200 py-0.5 px-1.5 rounded-full ml-1">optional</p>
						</div>
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Name</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_name3: e.target.value})} value={lnData.contact_name3} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Phone no.</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_no3: e.target.value})} value={lnData.contact_no3} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
					<div className="flex flex-col">
						<label className="text-sm">Email</label>
						<input type="text" onChange={(e)=>setLnData({...lnData, contact_email3: e.target.value})} value={lnData.contact_email3} className="border border-neutral-400 px-1 py-1 rounded focus:outline-0" />
					</div>
				</div>

			</div>
		</div>
	)
}

export default LnForm