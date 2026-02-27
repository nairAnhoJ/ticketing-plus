import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { submitFeedback } from "../homeSlice";

interface Data {
    ticket_id: number | undefined;
    rating: number;
    comment: string;
}

const FeedbackModal = ({id, close}: {id: number | undefined, close: () => void}) => {
    const dispatch = useAppDispatch();

    const [data, setData] = useState<Data>({
        ticket_id: id,
        rating: 0,
        comment: ''
    });

    const handleSubmit = async () => {
        if([1,2,3,4,5].includes(data.rating)){
            await dispatch(submitFeedback(data))
            close();
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-900/25 z-50">
            <div className="w-auto h-auto bg-white text-neutral-600 rounded-xl">
                <div className="p-6 flex items-center">
                    <div className="h-8 w-8"></div>
                    <h1 className="flex-1 font-bold text-center text-2xl">Rate your experience</h1>
                    <button onClick={() => close()} className="h-8 w-8 rounded-full hover:bg-neutral-300/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="w-120 px-6">
                    <p className="text-center px-10 font-medium">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</p>
                    <div className="flex items-center justify-center gap-x-3 mt-3">
                        <button onClick={()=>setData({...data, rating: 1})}><img src={`/icons/${(data.rating >= 1 ? 'star.png' : 'empty_star.png')}`} className="h-10 w-auto" /></button>
                        <button onClick={()=>setData({...data, rating: 2})}><img src={`/icons/${(data.rating >= 2 ? 'star.png' : 'empty_star.png')}`} className="h-10 w-auto" /></button>
                        <button onClick={()=>setData({...data, rating: 3})}><img src={`/icons/${(data.rating >= 3 ? 'star.png' : 'empty_star.png')}`} className="h-10 w-auto" /></button>
                        <button onClick={()=>setData({...data, rating: 4})}><img src={`/icons/${(data.rating >= 4 ? 'star.png' : 'empty_star.png')}`} className="h-10 w-auto" /></button>
                        <button onClick={()=>setData({...data, rating: 5})}><img src={`/icons/${(data.rating >= 5 ? 'star.png' : 'empty_star.png')}`} className="h-10 w-auto" /></button>
                    </div>
                    <div className="mt-6">
                        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({...data, comment: e.target.value})} className="w-full h-34 p-3 text-sm leading-4.5 border border-neutral-900/20 rounded-lg resize-none shadow-inner shadow-neutral-900/50 focus:outline-0" placeholder="Tell us about your experience!"></textarea>
                    </div>
                </div>
                <div className="pt-3 pb-6 flex items-center justify-center gap-x-3">
                    <button disabled={data.rating == 0} onClick={handleSubmit} className="w-26 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-neutral-800/30 disabled:pointer-events-none disabled:opacity-70">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackModal