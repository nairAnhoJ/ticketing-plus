import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { sendUpdate } from "../inboxSlice";
import config from "../../../config/config";

interface User {
    id: number;
    name: string;
}
interface Props {
	id: number | undefined;
	close: () => void
	me: User
}

function HoldModal({ id, close, me } : Props) {
	const appDispatch = useAppDispatch();
	const [reason, setReason] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	const handleSubmit = async() => {
		const msg = `Your ticket has been temporarily placed on hold.\n\nReason: ${reason}.\n\nWe will provide updates once processing resumes.`
		if (reason) {
			setError(false);

			const response = await config.patch(`/inbox/${id}/hold`);
			console.log(response);

			appDispatch(sendUpdate({id: id!, user_id: me.id,  message: msg}));
			close();
		} else {
			setError(true);
		}
	}

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-900/25 z-50">
			<div className="w-auto h-auto bg-white text-neutral-600 rounded">
					<div className="p-6 flex items-center gap-x-2">
						<div className="w-9 h-9 p-2 py-2.5 bg-gray-300/80 rounded-full text-gray-600 flex items-center justify-center gap-x-0.75">
							<div className="w-1.25 h-full bg-gray-500" />
							<div className="w-1.25 h-full bg-gray-500" />
						</div>

						<h1 className="font-semibold">Hold Ticket?</h1>
					</div>
					<div className="w-140 px-6">
						<div className="flex flex-col">
							<label className="text-sm">Reason <span className="italic text-red-500">*</span></label>
							<textarea rows={5} value={reason} onChange={(e) => setReason(e.target.value)} className={`border  px-1 py-1 rounded focus:outline-0 resize-none ${error ? 'border-red-400' : 'border-neutral-400'}`} />
						</div>
						<div className="text-sm mt-6">Are you sure you want to mark this ticket as on hold?</div>
					</div>
					<div className="p-6 flex items-center justify-end gap-x-3">
						<button onClick={close} className="w-20 h-9 border border-neutral-400 hover:border-neutral-500 rounded text-sm font-semibold">Cancel</button>
						<button onClick={handleSubmit} className="w-20 h-9 border border-emerald-400 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-semibold">Yes</button>
					</div>
			</div>
		</div>
	)
}

export default HoldModal