

function LnForm() {
  return (
    <div>
			<div className="flex flex-col mt-3">
				<label className="text-sm">Subject <span className="text-sm text-red-500">*</span></label>
				<select className={`border px-1 py-1 rounded focus:outline-0 disabled:opacity-60`}>
						<option className="hidden">Select an option</option>
						<option className="">Add Account</option>
						<option className="">Update Account</option>
						<option className="">Activate Account</option>
						<option className="">Deactivate Account</option>
						<option className="">Hold Account</option>
						<option className="">Lift Account</option>
				</select>
				<div className="w-full grid-cols-2 grid gap-4 mt-3">
					<div className="w-full">
						<label></label>
						<input type="text"/>
					</div>
				</div>
			</div>
    </div>
  )
}

export default LnForm