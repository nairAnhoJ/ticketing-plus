import { useAppSelector } from "../../../app/hooks";

interface Me {
  id: number;
}

export interface TicketUpdates {
    id: number;
    message: string;
    user_id: number;
    created_by: string;
    created_at: string;
}

interface Props {
  updates: TicketUpdates[] | null;
  onClose: () => void;
}
    // Format Date to MM/DD/YY HH:MM Format
const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

function MessagesModal({ updates, onClose }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const me: Me = JSON.parse(user);

  console.log(updates, me)

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/40 z-20'>
      <div className="w-96 h-4/5 bg-white rounded-2xl">
        <div className="h-full w-full flex flex-col pb-3 text-sm">
          <div className="border-b border-neutral-200 p-3 flex items-center justify-between text-neutral-600">
            <h1 className="font-semibold text-base">Messages</h1>
            <button onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
          </div>
          <div className="flex-1 w-full overflow-x-hidden overflow-y-auto flex flex-col-reverse gap-y-2 pl-3">
            {
              updates && updates.length > 0 ?
                updates.map((update, index)=>(
                  (update.user_id === me.id) ?
                  (
                      <div key={index} className="flex flex-col justify-end items-end">
                          <span className="text-[11px] font-semibold mr-3.5 h-3"></span>
                          <div className="bg-blue-600/85 px-3 py-2 rounded-t-lg rounded-bl-lg text-white max-w-[calc(100%-60px)] mr-3 relative whitespace-pre-wrap">
                              {update.message}
                              <div className="absolute -right-1.25 -bottom-1.25 w-2.5 h-2.5 rotate-45 border-5 border-transparent border-t-blue-600/85"></div>
                          </div>
                          <span className="text-[11px] font-semibold">{
                              formatDate(update.created_at).replace(',', ' ')
                          }</span>
                      </div>
                  ) 
                  : 
                  (
                      <div key={index} className="flex flex-col justify-end items-start">
                        <span className="text-[11px] font-semibold ml-3.5">{update.created_by}</span>
                        <div className="bg-neutral-300 px-3 py-2 rounded-t-lg rounded-br-lg text-neutral-800 max-w-[calc(100%-60px)] ml-3 relative whitespace-pre-wrap">
                            {update.message}
                            <div className="absolute -left-1.25 -bottom-1.25 w-2.5 h-2.5 rotate-45 border-5 border-transparent border-l-neutral-300"></div>
                        </div>
                        <span className="text-[11px] font-semibold">{formatDate(update.created_at).replace(',', ' ')}</span>
                      </div>
                  )
              ))
              : (
                <div className="flex-1 flex items-center justify-center pr-3 font-bold text-neutral-500/80 text-lg">
                  No messages
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesModal