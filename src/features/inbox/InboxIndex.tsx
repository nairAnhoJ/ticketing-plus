import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";


const HomeIndex = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showTicketMenu, setShowTicketMenu] = useState(false);
    const [currentTab, setCurrentTab] = useState<string>('all');
    const me = JSON.parse(user);


    const handleTicketSelect = (id: number) => {
        console.log(me)
        console.log(id)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <>

            {/* FOR MOBILE */}
            <div className="lg:hidden w-screen h-dvh overflow-hidden flex flex-col bg-[#212121]">
                {/* Create new ticket button */}
                <Link to='/ticket/create' className="bg-[#303030] absolute right-5 bottom-5 flex items-center justify-center pl-3.5 pr-2 py-3.5 rounded-full text-neutral-200">
                    <h1 className="whitespace-nowrap">Write Ticket</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6" viewBox="0 -960 960 960" fill="currentColor">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                    </svg>
                </Link>
                <div className="w-full h-16 py-2.25 px-2.5 text-white flex justify-center items-end">
                    <div className="w-full h-full flex items-center">
                        <img src="/default-avatar.jpg" alt="avatar" className="h-full aspect-square rounded-full border-2 border-neutral-500" />
                        <div className="h-full flex flex-col items-start justify-center ml-1.5 relative">
                            <button onClick={()=>setShowProfileMenu(!showProfileMenu)} className="flex">
                                <h1 className="font-semibold leading-4">{me?.name}</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                                </svg>
                            </button>
                            <p className="text-xs leading-3">{me?.department}</p>
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
                    {/* <Link to='/ticket/create' className=" whitespace-nowrap flex gap-x-1 bg-[#404040] px-3 py-1 pt-1.5 rounded-full text-neutral-300">
                        <h1 className="text-sm">Write Ticket</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                    </Link> */}
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
        
            {/* FOR DESKTOP */}
            <div className="hidden lg:flex w-screen bg-white h-dvh pl-16 overflow-hidden">
                {/* TICKET LIST SECTION */}
                <div className="h-full w-100 pt-6 border-r border-[#ccc] text-[#505050]">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full h-10 px-6">
                        <h1 className="text-2xl font-bold">Inbox</h1>
                        {/* <Link to='/ticket/create' className="bg-[#303030] flex items-end justify-center pl-3 pr-1.5 py-1 rounded-full text-neutral-200">
                            <h1 className="whitespace-nowrap text-xs">Write Ticket</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                            </svg>
                        </Link> */}
                    </div>

                    {/* SEARCH */}
                    <div className="w-full px-6 relative mt-1">
                        <input type="text" className="h-8 w-full text-sm  border border-[#777] rounded-full focus:outline-0 pl-7 pb-0.5" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 absolute top-1.5 left-7.5" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                        </svg>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 mt-3">
                        <div className="h-12 w-full bg-neutral-200 rounded-lg grid grid-cols-3">
                            <div className="text-xs font-bold p-2">
                                <button onClick={()=>setCurrentTab('all')} className={`flex items-center justify-center w-full h-full rounded-lg cursor-pointer ${currentTab === 'all' && 'bg-[#303030] text-white'}`}>
                                    All
                                </button>
                            </div>
                            <div className="text-xs font-bold p-2">
                                <button onClick={()=>setCurrentTab('pending')} className={`flex items-center justify-center w-full h-full rounded-lg cursor-pointer ${currentTab === 'pending' && 'bg-[#303030] text-white'}`}>
                                    Pending
                                </button>
                            </div>
                            <div className="text-xs font-bold p-2">
                                <button onClick={()=>setCurrentTab('in-progress')} className={`flex items-center justify-center w-full h-full rounded-lg cursor-pointer ${currentTab === 'in-progress' && 'bg-[#303030] text-white'}`}>
                                    In-Progress
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* List */}
                    <div className="w-full h-[calc(100%-148px)] overflow-y-auto mt-3 pl-1">
                        {/* Row */}
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 pt-4 pb-2 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        <div className="w-2 h-2 ml-1 rounded-full bg-red-500 border border-red-600"></div>
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">PENDING NA TICKET</h2>
                                {/* Description at Notif Count */}
                                <div className="w-full h-6 flex items-center">
                                    <p className="text-xs truncate flex-1">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                                    <div className="w-6 h-6 rounded-full bg-red-600/75 text-xs tracking-wide text-white ml-2 flex items-center justify-center">
                                        23
                                    </div>
                                </div>

                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 pt-4 pb-2 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        <div className="w-2 h-2 ml-1 rounded-full bg-amber-500 border border-amber-600"></div>
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">IN-PROGRESS NA TICKET</h2>
                                {/* Description at Notif Count */}
                                <div className="w-full h-6 flex items-center">
                                    <p className="text-xs truncate flex-1">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                                    <div className="w-6 h-6 rounded-full bg-red-600/75 text-xs tracking-wide text-white ml-2 flex items-center justify-center">
                                        23
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 pt-4 pb-2 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        <div className="w-2 h-2 ml-1 rounded-full bg-emerald-500 border border-emerald-600"></div>
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">WAITING NG FEEDBACK NA TICKET</h2>
                                {/* Description at Notif Count */}
                                <div className="w-full h-6 flex items-center">
                                    <p className="text-xs truncate flex-1">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                                    <div className="w-6 h-6 rounded-full bg-red-600/75 text-xs tracking-wide text-white ml-2 flex items-center justify-center">
                                        23
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 pt-4 pb-2 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        {/* <div className="w-2 h-2 ml-1 rounded-full bg-red-500 border border-red-600"></div> */}
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">COMPLETED NA TICKET</h2>
                                {/* Description at Notif Count */}
                                <div className="w-full h-6 flex items-center">
                                    <p className="text-xs truncate flex-1">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                                    {/* <div className="w-6 h-6 rounded-full bg-red-600/75 text-xs tracking-wide text-white ml-2 flex items-center justify-center">
                                        23
                                    </div> */}
                                </div>
                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full border-l-4 border-blue-500 p-2 pt-4 pb-2 flex items-center gap-x-2 bg-neutral-200/60 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        {/* <div className="w-2 h-2 ml-1 rounded-full bg-red-500 border border-red-600"></div> */}
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">COMPLETED NA TICKET (SELECTED)</h2>
                                {/* Description at Notif Count */}
                                <div className="w-full h-6 flex items-center">
                                    <p className="text-xs truncate flex-1">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                                    {/* <div className="w-6 h-6 rounded-full bg-red-600/75 text-xs tracking-wide text-white ml-2 flex items-center justify-center">
                                        23
                                    </div> */}
                                </div>
                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 py-4 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        {/* <div className="w-2 h-2 ml-1 rounded-full bg-red-500 border border-red-600"></div> */}
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">COMPLETED NA TICKET</h2>
                                {/* Description at Notif Count */}
                                <div className="w-full h-6 flex items-center">
                                    <p className="text-xs truncate flex-1">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                                    {/* <div className="w-6 h-6 rounded-full bg-red-600/75 text-xs tracking-wide text-white ml-2 flex items-center justify-center">
                                        23
                                    </div> */}
                                </div>
                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 py-4 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        {/* <div className="w-2 h-2 ml-1 rounded-full bg-red-500 border border-red-600"></div> */}
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">COMPLETED NA TICKET</h2>
                                {/* Description */}
                                <p className="text-xs truncate">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                            </div>
                        </button>
                        <button onClick={()=>handleTicketSelect(1)} className="w-full p-2 py-4 flex items-center gap-x-2 hover:bg-neutral-100 cursor-pointer">
                            <img src="default-avatar.jpg" className="w-10 h-10 rounded-full border-2 border-[#707070]" alt="avatar" />
                            <div className="flex flex-col w-[calc(100%-48px)]">
                                <div className="grid grid-cols-12">
                                    {/* Name and Status */}
                                    <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden col-span-8 text-left">
                                        JOHN ARIAN MALONDRAS
                                        {/* <div className="w-2 h-2 ml-1 rounded-full bg-red-500 border border-red-600"></div> */}
                                    </div>
                                    {/* Date and Time */}
                                    <p className="text-xs text-right col-span-4">01/29/26 11:25 AM</p>
                                </div>
                                {/* Subject */}
                                <h2 className="font-medium text-xs text-left">COMPLETED NA TICKET</h2>
                                {/* Description */}
                                <p className="text-xs truncate">Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket Ito naman yung description ng ticket </p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* BODY SECTION / RIGHT SIDE */}
                <div className="h-dvh w-[calc(100%-400px)] flex-1">
                    {/* HEADER / COUNTER */}
                    <div className="w-full h-34 flex items-center justify-center p-6 gap-x-6 text-white border-b border-[#ccc]">
                        <div className="bg-red-500 shadow-lg shadow-neutral-400/60 h-full w-56 rounded-lg flex items-center justify-center gap-x-2">
                            <h1 className="text-5xl font-bold pb-1">299</h1>
                            <p className="text-sm">Pending</p>
                        </div>
                        <div className="bg-amber-500 shadow-lg shadow-neutral-400/60 h-full w-56 rounded-lg flex items-center justify-center gap-x-2">
                            <h1 className="text-5xl font-bold pb-1">4</h1>
                            <p className="text-xs">In-Progress</p>
                        </div>
                        <div className="bg-emerald-500 shadow-lg shadow-neutral-400/60 h-full w-56 rounded-lg flex items-center justify-center gap-x-2">
                            <h1 className="text-5xl font-bold pb-1">2</h1>
                            <p className="text-xs">Needs Feedback</p>
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="w-full h-[calc(100%-136px)] text-[#454545]">
                        <div className="w-full h-full flex">
                            <div className="w-[calc(100%-360px)] h-full p-6 border-r border-[#ccc]">
                                {/* Header */}
                                <div className="w-full h-18">
                                    <div className="w-full h-full flex justify-between">
                                        <div className="h-12 w-1/2 flex">
                                            <img src="default-avatar.jpg" className="w-12 h-12 rounded-full border-2 border-[#808080]" alt="avatar" />
                                            <div className="flex flex-col justify-center pl-1.5">
                                                <h1 className="font-semibold leading-4">{me.name}</h1>
                                                <p className="text-xs">{me.department}</p>
                                            </div>
                                        </div>
                                        <div className="h-12 flex items-center gap-x-2 py-2">
                                            <div className="flex flex-col items-end">
                                                {/* <h1 className="font-semibold leading-4">TICKET NUMBER</h1> */}
                                                <p className="text-xs">01/29/2026 11:25 AM</p>
                                            </div>
                                            <div className="h-full aspect-square relative">
                                                <button onClick={()=>setShowTicketMenu(true)} className="w-full h-full flex items-center justify-center cursor-pointer rounded-lg hover:bg-neutral-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                                                    </svg>
                                                </button>
                                                {
                                                    showTicketMenu &&
                                                    <>
                                                        <div onClick={()=>setShowTicketMenu(false)} className="fixed top-0 left-0 h-screen w-screen z-1"></div>
                                                        <div className="w-60 h-auto absolute right-4 bottom-1 translate-y-full bg-[#f4f4f4] shadow shadow-neutral-500 rounded-lg z-2">
                                                            <div className="w-full flex flex-col">
                                                                <button className="cursor-pointer py-2 hover:bg-neutral-300/90 rounded-t-lg">Start Ticket</button>
                                                                <button className="cursor-pointer py-2 hover:bg-neutral-300/90 rounded-t-lg">Mark as Completed</button>
                                                                <button className="cursor-pointer py-2 hover:bg-neutral-300/90 rounded-b-lg">Cancel Ticket</button>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-[#ccc]"/>
                                </div>
                                
                                {/* Body */}
                                <div className="w-full h-[calc(100%-72px)] py-6 overflow-x-hidden overflow-y-auto">
                                    <div className="w-full flex flex-col">
                                        <h1 className="text-lg font-semibold">TICKET NUMBER</h1>
                                        <h1 className="font-semibold">COMPLETED NA TICKET (SELECTED)</h1>
                                        <p className="text-sm leading-4 mt-3">olor sit amet consectetur adipisicing elit. Molestiae, libero ut. Modi, expedita reiciendis praesentium pariatur mollitia sit iure maiores debitis explicabo repellat incidunt qui recusandae optio, ea ullam reprehenderit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, libero ut. Modi, expedita reiciendis praesentium pariatur mollitia sit iure maiores debitis explicabo repellat incidunt qui recusandae optio, ea ullam reprehenderit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, libero ut. Modi, expedita reiciendis praesentium pariatur mollitia sit iure maiores debitis explicabo repellat incidunt qui recusandae optio, ea ullam reprehenderit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, libero ut. Modi, expedita reiciendis praesentium pariatur mollitia sit iure maiores debitis explicabo repellat incidunt qui recusandae optio, ea ullam reprehenderit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, libero ut. Modi, expedita reiciendis praesentium pariatur mollitia sit iure maiores debitis</p>
                                        <div className="w-full mt-6">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-sm font-bold">Attachment/s</h1>
                                                <button className="text-sm text-blue-500 hover:underline cursor-pointer font-medium">Download All</button>
                                            </div>
                                            <div className="w-full h-18 mt-1 overflow-x-auto overflow-y-hidden flex gap-x-3">
                                                {/* Attachments */}
                                                <button className="w-60 shrink-0 h-14 bg-neutral-200 p-2 rounded flex cursor-pointer hover:bg-neutral-300/80">
                                                    <div className="h-full aspect-square flex items-center justify-center rounded text-white">
                                                        <img src="/icons/pdf.png" className="w-9 h-9" alt="pdf_icon" />
                                                    </div>
                                                    <div className="w-[calc(100%-76px)] pl-1.5 flex items-center">
                                                        <h1 className="w-full truncate text-xs text-left text-neutral-800/90">File_name_na_mahabang_mahaba.pdf</h1>
                                                    </div>
                                                    <div className="h-full aspect-square flex items-center justify-center text-neutral-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                                    </div>
                                                </button>
                                                <button className="w-60 shrink-0 h-14 bg-neutral-200 p-2 rounded flex cursor-pointer hover:bg-neutral-300/80">
                                                    <div className="h-full aspect-square flex items-center justify-center rounded text-white">
                                                        <img src="/icons/image.png" className="w-9 h-9" alt="pdf_icon" />
                                                    </div>
                                                    <div className="w-[calc(100%-76px)] pl-1.5 flex items-center">
                                                        <h1 className="w-full truncate text-xs text-left text-neutral-800/90">Image File.png</h1>
                                                    </div>
                                                    <div className="h-full aspect-square flex items-center justify-center text-neutral-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                                    </div>
                                                </button>
                                                <button className="w-60 shrink-0 h-14 bg-neutral-200 p-2 rounded flex cursor-pointer hover:bg-neutral-300/80">
                                                    <div className="h-full aspect-square flex items-center justify-center rounded text-white">
                                                        <img src="/icons/doc.png" className="w-9 h-9" alt="pdf_icon" />
                                                    </div>
                                                    <div className="w-[calc(100%-76px)] pl-1.5 flex items-center">
                                                        <h1 className="w-full truncate text-xs text-left text-neutral-800/90">Doc File.docx</h1>
                                                    </div>
                                                    <div className="h-full aspect-square flex items-center justify-center text-neutral-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                                    </div>
                                                </button>
                                                <button className="w-60 shrink-0 h-14 bg-neutral-200 p-2 rounded flex cursor-pointer hover:bg-neutral-300/80">
                                                    <div className="h-full aspect-square flex items-center justify-center rounded text-white">
                                                        <img src="/icons/xls.png" className="w-9 h-9" alt="pdf_icon" />
                                                    </div>
                                                    <div className="w-[calc(100%-76px)] pl-1.5 flex items-center">
                                                        <h1 className="w-full truncate text-xs text-left text-neutral-800/90">Excel File.xlsx</h1>
                                                    </div>
                                                    <div className="h-full aspect-square flex items-center justify-center text-neutral-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                                    </div>
                                                </button>
                                                <button className="w-60 shrink-0 h-14 bg-neutral-200 p-2 rounded flex cursor-pointer hover:bg-neutral-300/80">
                                                    <div className="h-full aspect-square flex items-center justify-center rounded text-white">
                                                        <img src="/icons/ppt.png" className="w-9 h-9" alt="pdf_icon" />
                                                    </div>
                                                    <div className="w-[calc(100%-76px)] pl-1.5 flex items-center">
                                                        <h1 className="w-full truncate text-xs text-left text-neutral-800/90">Power Point File.pptx</h1>
                                                    </div>
                                                    <div className="h-full aspect-square flex items-center justify-center text-neutral-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-90 h-full">
                                <div className="w-full h-full px-3 pt-3 pb-6">
                                    <div>
                                        <h1 className="text-sm font-bold">Ticket Updates</h1>
                                    </div>
                                    <div className="h-[calc(100%-80px)] w-full flex flex-col-reverse gap-y-2 py-3 text-sm overflow-x-hidden overflow-y-auto">
                                        <div className="flex flex-col justify-end items-start">
                                            <span className="text-[11px] font-semibold ml-3.5">{me.name}</span>
                                            <div className="bg-neutral-300 px-3 py-2 rounded-t-lg rounded-br-lg text-neutral-800 max-w-[calc(100%-60px)] ml-3 relative">
                                                Test Reply 2 na sobrang haba na parang kasing haba ng building
                                                <div className="absolute -left-1.25 -bottom-1.25 w-2.5 h-2.5 rotate-45 border-5 border-transparent border-l-neutral-300"></div>
                                            </div>
                                            <span className="text-[11px] font-semibold">01/29/2026 07:22 PM</span>
                                        </div>
                                        <div className="flex flex-col justify-end items-end">
                                            <span className="text-[11px] font-semibold mr-3.5 h-3"></span>
                                            <div className="bg-blue-600/85 px-3 py-2 rounded-t-lg rounded-bl-lg text-white max-w-[calc(100%-60px)] mr-3 relative">
                                                Test Update 2 na mahabang mahaba, yung mas mahaba pa sa catdog
                                                <div className="absolute -right-1.25 -bottom-1.25 w-2.5 h-2.5 rotate-45 border-5 border-transparent border-t-blue-600/85"></div>
                                            </div>
                                            <span className="text-[11px] font-semibold">01/29/2026 07:22 PM</span>
                                        </div>
                                        <div className="flex flex-col justify-end items-start">
                                            <span className="text-[11px] font-semibold ml-3.5">{me.name}</span>
                                            <div className="bg-neutral-300/80 px-3 py-2 rounded-t-lg rounded-br-lg text-neutral-800 max-w-[calc(100%-60px)] ml-3 relative">
                                                Test Reply 1
                                                <div className="absolute -left-1.25 -bottom-1.25 w-2.5 h-2.5 rotate-45 border-5 border-transparent border-l-neutral-300"></div>
                                            </div>
                                            <span className="text-[11px] font-semibold">01/29/2026 07:22 PM</span>
                                        </div>
                                        <div className="flex flex-col justify-end items-end relative">
                                            <span className="text-[11px] font-semibold mr-3.5 h-3"></span>
                                            <div className="bg-blue-600/85 px-3 py-2 rounded-t-lg rounded-bl-lg text-white max-w-[calc(100%-60px)] mr-3 relative">
                                                Test Update 1
                                                <div className="absolute -right-1.25 -bottom-1.25 w-2.5 h-2.5 rotate-45 border-5 border-transparent border-t-blue-600/85"></div>
                                            </div>
                                            <span className="text-[11px] font-semibold">
                                                01/29/2026 07:22 PM
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-12 mt-3">
                                        <div className="w-full h-full relative">
                                            <input type="text" className="w-full h-full border border-neutral-300/80 text-sm rounded-xl pl-2 pb-0.5 pr-10 focus:outline-0 shadow-inner shadow-neutral-400" placeholder="Message"/>
                                            <button className="w-9 h-9 absolute top-1.5 right-1 flex items-center justify-center cursor-pointer text-blue-600/80 hover:text-blue-600 rounded-full">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M140-190v-580l688.46 290L140-190Zm60-90 474-200-474-200v147.69L416.92-480 200-427.69V-280Zm0 0v-400 400Z"/></svg> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 -960 960 960" fill="currentColor"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeIndex