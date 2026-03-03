function Security() {
    return (
        <div>
            <div className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Password</h3>
                <div className="space-y-1">
                    <div className="space-y-3 py-2">
                        <div>
                            <label className="text-xs text-zinc-500 mb-1.5 block">Current password</label>
                            <input type="password" className={"w-full bg-zinc-100 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-600 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"} autoComplete='off' />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-zinc-500 mb-1.5 block">New password</label>
                            <input type="password" className={"w-full bg-zinc-100 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-600 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"} autoComplete='off' />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 mb-1.5 block">Confirm new password</label>
                            <input type="password" className={"w-full bg-zinc-100 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-600 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"} autoComplete='off' />
                        </div>
                        </div>
                        <div className="flex justify-end pt-1">
                        <button className="px-5 py-2 text-sm text-white font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                            Update password
                        </button>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Security