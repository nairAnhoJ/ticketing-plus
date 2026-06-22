import { useEffect, useState } from "react";
import config from "../../../config/config";

interface Customer {
	id: number;
	name: string;
	bp_code: string;
	sap_bp_code: string;
	ln_bp_code: string;
}

interface Props {
	close: () => void;
	setSelectedCustomerId: React.Dispatch<React.SetStateAction<number>>;
}

function CustomerBrowser({ close, setSelectedCustomerId }: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const [customers, setCustomers] = useState<Customer[]>([]);

	const fetchCustomers = async () => {
		setLoading(true);
		try {
			const response = await config.get(`/ln-customers?search=${search}`);
			console.log(response.data);
			setCustomers(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchCustomers();
	}, [search])

	const handleRowClick = (customerId: number) => {
		setSelectedCustomerId(customerId);
		close();
	}

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-neutral-900/30 flex items-center justify-center">
			<div className="w-4/5 h-4/5 bg-white rounded-lg">
				<div className="w-full h-full flex flex-col">
					<div className="h-16 flex items-center justify-between border-b border-neutral-200 p-4">
						<h1 className="font-bold text-lg">Customers</h1>
						<button type="button" onClick={close} className="p-1 rounded hover:bg-neutral-100 cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
						</button>
					</div>
					<div className="h-[calc(100%-64px)] flex-1 flex flex-col gap-y-3 p-4">
						{/* Controls */}
						<div>
							<input type="text" placeholder="BP Code or Name..." className="border border-neutral-400 py-1 px-2 w-full rounded-lg" onChange={(e) => setSearch(e.target.value)} value={search} />
						</div>
						<div className="w-full flex-1 overflow-y-scroll text-neutral-500">
							<table className="w-full">
								<thead>
									<tr>
										<th className="px-2">#</th>
										<th className="px-2">SAP BP Code</th>
										<th className="px-2">LN BP Code</th>
										<th className="text-left">Name</th>
									</tr>
								</thead>
								<tbody>
									{
										loading ? (
											<tr>
												<td colSpan={3} className="pt-10">Loading...</td>
											</tr>
										) : (
											customers.length > 0 ?
												customers.map((customer, index) => (
													<tr className="hover:bg-neutral-200 even:bg-neutral-100" key={customer.id}>
														<td className="text-center cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleRowClick(customer.id)}>{index + 1}</td>
														<td className="text-center cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleRowClick(customer.id)}>{customer.sap_bp_code}</td>
														<td className="text-center cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleRowClick(customer.id)}>{customer.ln_bp_code}</td>
														<td className="text-left cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleRowClick(customer.id)}>{customer.name}</td>
													</tr>
												)
											) : (
												<tr>
													<td colSpan={3} className="text-center py-4">
														No customers found.
													</td>
												</tr>
											)
										)
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default CustomerBrowser