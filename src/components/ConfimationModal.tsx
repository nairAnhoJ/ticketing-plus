interface Details {
    type: string;
    title: string;
    msg: string;
    confirmText: string;
    cancelText: string;
}

interface DetailsProps {
    details: Details;
    confirmClick: () => void;
    cancelClick: () => void;
}


const ConfirmationModal = ({details, confirmClick, cancelClick}: DetailsProps) => {
    const handleConfirm = () => {
        confirmClick();
    } 

    const handleCancel = () => {
        cancelClick();
    } 

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-900/25 z-50">
                <div className="w-auto h-auto bg-white text-neutral-600 rounded">
                    <div className="p-6 flex items-center gap-x-2">
                        {
                            (details.type === 'start') ?
                            (
                                <div className="w-7 h-7 p-1.75 bg-emerald-300/80 rounded-full text-emerald-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
                                    
                                </div>
                                
                            )
                            :
                            (details.type === 'cancel') ?
                            (
                                <div className="w-7 h-7 p-1.5 bg-red-300/80 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </div>
                            )
                            :
                            ''
                        }

                        <h1 className="font-semibold">{details.title}</h1>
                    </div>
                    <div className="max-w-96 px-6">
                        <div className="text-sm">{details.msg}</div>
                    </div>
                    <div className="p-6 flex items-center justify-end gap-x-3">
                        <button onClick={handleCancel} className="w-20 h-9 border border-neutral-400 hover:border-neutral-500 rounded text-sm font-semibold cursor-pointer">{details.cancelText}</button>
                        
                        {
                            (details.type === 'start') ?
                            (
                                <button onClick={handleConfirm} className="w-20 h-9 border border-emerald-400 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-semibold cursor-pointer">{details.confirmText}</button>
                            )
                            :
                            (details.type === 'cancel') ?
                            (
                                <button onClick={handleConfirm} className="w-20 h-9 border border-red-400 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-semibold cursor-pointer">{details.confirmText}</button>
                            )
                            :
                            ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal;