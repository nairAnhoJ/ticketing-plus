

const CompleteModal = ({close}: {close: () => void}) => {


    const handleFileChange = () => {

    }

    const handleSubmit = () => {
        close();
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-900/25 z-50">
            <div className="w-auto h-auto bg-white text-neutral-600 rounded">
                <div className="p-6 flex items-center gap-x-2">
                    <div className="w-7 h-7 p-1.75 bg-emerald-300/80 rounded-full text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>

                    <h1 className="font-semibold">Complete Ticket?</h1>
                </div>
                <div className="w-140 px-6">
                    <div>
                        <label className="text-xs">Resolution <span className="italic text-red-500 font-bold">*</span></label>
                        <textarea className="w-full h-34 p-1.5 text-sm border rounded-lg resize-none"></textarea>
                    </div>
                    <div>
                        <p className="text-xs block mb-2">Attachments</p>
                        <label htmlFor="file-upload" className="w-36 text-white bg-blue-500 hover:bg-blue-600 border border-blue-400 px-5 py-1 rounded text-sm font-semibold cursor-pointer flex items-center justify-center gap-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload">
                                <path d="M12 3v12"/>
                                <path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            </svg>
                            Browse Files
                        </label>
                        <input onChange={handleFileChange} type="file" id="file-upload" multiple className="hidden" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx" />
                        <div className="flex flex-col mt-1 max-h-24 overflow-y-auto">

                            <div className="flex items-center gap-x-1">
                                <h1 className="text-xs">File 1.pdf</h1>
                                <button className="text-neutral-400 hover:text-red-500 w-4 hover:w-15 h-4 overflow-hidden relative cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                    <p className="absolute top-px left-4 text-xs leading-3 underline">Remove</p>
                                </button>
                            </div>


                            
                            <div className="flex items-center gap-x-1">
                                <h1 className="text-xs">File 1.pdf</h1>
                                <button className="text-neutral-400 hover:text-red-500 w-4 hover:w-15 h-4 overflow-hidden relative cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                    <p className="absolute top-px left-4 text-xs leading-3 underline">Remove</p>
                                </button>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <h1 className="text-xs">File 1.pdf</h1>
                                <button className="text-neutral-400 hover:text-red-500 w-4 hover:w-15 h-4 overflow-hidden relative cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                    <p className="absolute top-px left-4 text-xs leading-3 underline">Remove</p>
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="text-sm mt-6">Once you complete this ticket, it cannot be reopened. Are you sure you want to proceed?</div>
                </div>
                <div className="p-6 flex items-center justify-end gap-x-3">
                    <button onClick={close} className="w-20 h-9 border border-neutral-400 hover:border-neutral-500 rounded text-sm font-semibold cursor-pointer">Cancel</button>
                    <button onClick={handleSubmit} className="w-20 h-9 border border-emerald-400 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-semibold cursor-pointer">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteModal