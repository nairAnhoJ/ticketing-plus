import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";


const HomeIndex = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <>
            <div className="lg:hidden w-screen h-screen overflow-hidden flex flex-col bg-[#212121]">
                <div className="w-full h-16 py-2.25 px-2.5 text-white flex justify-center items-end">
                    <div className="w-full h-full flex items-center">
                        <img src="/default-avatar.jpg" alt="avatar" className="h-full rounded-full border-2 border-neutral-500" />
                        <div className="h-full flex flex-col items-start justify-center ml-1.5 relative">
                            <button onClick={()=>setShowProfileMenu(!showProfileMenu)} className="flex">
                                <h1 className="font-semibold leading-4">{JSON.parse(user).name}</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                                </svg>
                            </button>
                            <p className="text-xs leading-3">{JSON.parse(user).department}</p>
                            {
                                showProfileMenu &&
                                <>
                                    <div onClick={()=>setShowProfileMenu(!showProfileMenu)} className="fixed top-0 left-0 w-screen h-screen z-1"></div>
                                    <div className="absolute flex flex-col top-6.5 -left-1 rounded p-1 bg-[#454545] z-2">
                                        <button className="py-2 whitespace-nowrap border-b border-[#808080] px-5">Change Avatar</button>
                                        <button onClick={handleLogout} className="py-2">Logout</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <Link to='/ticket/create' className=" whitespace-nowrap flex gap-x-1 bg-[#404040] px-3 py-1 pt-1.5 rounded-full text-neutral-300">
                        <h1 className="text-sm">Write Ticket</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                    </Link>
                </div>
                <div className="w-full sm:w-112.5 h-15 flex gap-x-2 pb-2 px-2.5 mb-2 mx-auto">
                    <div className="bg-red-400 w-full rounded-xl flex flex-col justify-center items-center">
                        <p className="font-bold text-lg leading-5">99</p>
                        <p className="text-xs leading-3.5">Pending</p>
                    </div>
                    <div className="bg-amber-400 w-full rounded-xl flex flex-col justify-center items-center">
                        <p className="font-bold text-lg leading-5">99</p>
                        <p className="text-xs leading-3.5">In-Progress</p>
                    </div>
                    <div className="bg-emerald-400 w-full rounded-xl flex flex-col justify-center items-center">
                        <p className="font-bold text-lg leading-5">99</p>
                        <p className="text-xs leading-3.5">Needs Feedback</p>
                    </div>
                </div>
                <div className="flex-1 h-[calc(100%-132px)] w-full bg-neutral-100 rounded-t-xl pt-3 text-neutral-600">
                    {/* Search */}
                    <div className="w-full h-10 relative px-3">
                        <input type="text" className="w-full h-10 border border-neutral-600 rounded-xl bg-white pl-8.5 focus:outline-0"/>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 absolute top-1.5 left-4.5" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                        </svg>
                    </div>

                    
                    <h1 className="text-xs font-bold text-[#808080] px-3 pt-3 pb-1">TICKETS</h1>

                    {/* List */}
                    <div className="w-full h-[calc(100%-72px)] overflow-x-hidden border-t overflow-y-auto border-neutral-400">
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs truncate">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs truncate">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                        <Link to="/tickets/id" className="w-full border-b border-neutral-400 p-2 flex flex-col">
                            <div className="flex justify-between items-end">
                                <h1 className="font-bold">USER NA NAG-REQUEST</h1>
                                <p className="text-xs">Jan 24, 2026 07:25 PM</p>
                            </div>
                            <h2 className="font-medium text-sm">SUBJECT NG TICKET</h2>
                            <p className="text-xs">Ito naman yung description ng ticket</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeIndex