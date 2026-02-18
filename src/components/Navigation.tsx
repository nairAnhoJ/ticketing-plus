import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";


const Navigation = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [expandMenu, setExpandMenu] = useState<boolean>(false);
    const [expandProfileMenu, setExpandProfileMenu] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }



    return (
        <>
            {/* For Mobile */}
            <button onClick={()=>setShowMenu(!showMenu)} className={`lg:hidden absolute w-8 h-8 top-3.5 right-3.5 text-white transition-all duration-200 z-11 ${showMenu && 'rotate-180'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 w-8 transition-all duration-200 ${showMenu && 'opacity-0' }`} viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 w-8 transition-all duration-200 ${!showMenu && 'opacity-0' }`} viewBox="0 -960 960 960" fill="currentColor">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </button>
            <div className={`lg:hidden fixed top-0 right-0 ${showMenu ? 'h-[225%] md:h-[250%]' : 'h-0' } overflow-hidden rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-200 bg-[#353535] aspect-square z-10`}>
                <div className={`absolute top-1/2 left-1/2  aspect-square h-[110dvh] text-white transition-all duration-250 flex flex-col gap-y-6 items-end py-20 pr-5 ${!showMenu ? 'opacity-0' : '-translate-x-full'}`}>
                        <Link onClick={()=>setShowMenu(false)} to='/' className="text-5xl font-bold">My Requests</Link>
                        <Link to='/inbox' className="text-5xl font-bold">Inbox</Link>
                        <button className="text-5xl font-bold">Ticket Report</button>
                        <button className="text-5xl font-bold">Settings</button>
                        <button onClick={handleLogout} className="text-5xl font-bold">Logout</button>
                </div>
            </div>

            {/* For Desktop */}
            <div className={`hidden lg:flex flex-col fixed top-0 left-0 bg-[#212121] h-dvh ${expandMenu?'w-72':'w-16'} p-3 transition-all duration-200 items-center justify-between z-10`}>
                {/* HEADER */}
                <div className="relative w-full flex justify-center">
                    {/* Logo */}
                    <img src="/Logo.png" className="w-8" alt="logo" />
                    {/* Expand Menu Button */}
                    <button onClick={()=>setExpandMenu(!expandMenu)} className={`absolute top-10 -right-5 h-10 rounded-full flex items-center justify-center bg-[#252525] border border-[#505050] text-white cursor-pointer ${expandMenu && 'rotate-180'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24" fill="currentColor">
                            <g id="feArrowRight0" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                                <g id="feArrowRight1" fill="currentColor">
                                    <path id="feArrowRight2" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>

                {/* MIDDLE SECTION */}
                <div className="text-neutral-100 w-full flex flex-col gap-y-2">
                    {/* HOME */}
                    <Link to='/' className={`${expandMenu ? 'w-66' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M8 1.4L6 2.7V1H4v3L0 6.6l.6.8L8 2.6l7.4 4.8l.6-.8z"/>
                            <path fill="currentColor" d="M8 4L2 8v7h5v-3h2v3h5V8z"/>
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M440-400v-166l-64 64-56-58 160-160 160 160-56 58-64-64v166h-80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z"/>
                        </svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold">My Requests</h1>
                    </Link>

                    {/* INBOX */}
                    <Link to='/inbox' className={`${expandMenu ? 'w-66' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q5.39 0 8.85-3.46t3.46-8.85v-115.38H628.46q-26.15 38-64.96 59-38.81 21-83.5 21t-83.5-21q-38.81-21-64.96-59H200v115.38q0 5.39 3.46 8.85t8.85 3.46ZM480-307.69q38 0 69-22t43-58h168v-360q0-5.39-3.46-8.85t-8.85-3.46H212.31q-5.39 0-8.85 3.46t-3.46 8.85v360h168q12 36 43 58t69 22ZM212.31-200H200h560H212.31Z"/></svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold">Inbox</h1>
                    </Link>

                    {/* TICKET REPORT */}
                    <Link to='/' className={`${expandMenu ? 'w-66' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 32">
                            <path fill="currentColor" d="M10 18h8v2h-8zm0-5h12v2H10zm0 10h5v2h-5z"/>
                            <path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"/>
                        </svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold whitespace-nowrap">Ticket Report</h1>
                    </Link>

                    {/* SETTINGS */}
                    {/* <Link to='/' className={`${expandMenu ? 'w-46' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                                <path d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"/><path d="M20.79 9.152C21.598 10.542 22 11.237 22 12s-.403 1.458-1.21 2.848l-1.923 3.316c-.803 1.384-1.205 2.076-1.865 2.456s-1.462.38-3.065.38h-3.874c-1.603 0-2.405 0-3.065-.38s-1.062-1.072-1.865-2.456L3.21 14.848C2.403 13.458 2 12.763 2 12s.403-1.458 1.21-2.848l1.923-3.316C5.936 4.452 6.338 3.76 6.998 3.38S8.46 3 10.063 3h3.874c1.603 0 2.405 0 3.065.38s1.062 1.072 1.865 2.456z"/>
                            </g>
                        </svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold">Settings</h1>
                    </Link> */}
                </div>

                {/* FOOTER */}
                <div className="text-neutral-100 w-full flex flex-col gap-y-5">
                    <div className="relative">
                        {/* PROFILE DETAILS */}
                        <button onClick={()=>setExpandProfileMenu(true)} className={`${expandMenu ? 'w-66' : 'w-10'} h-12 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] px-1 py-1.5 rounded-lg`}>
                            <img src="default-avatar.jpg" className="w-8 h-8 rounded-full" alt="avatar" />
                            <div className="absolute flex justify-between w-54 top-2.5 left-11 text-sm text-left">
                                <div>
                                    <h1 className="font-semibold leading-4 whitespace-nowrap">{JSON.parse(user).name}</h1>
                                    <p className="text-xs leading-3">{JSON.parse(user).department}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <g id="feArrowRight0" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                                        <g id="feArrowRight1" fill="currentColor">
                                            <path id="feArrowRight2" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </button>

                        {/* PROFILE MENU */}
                        {
                            expandProfileMenu && 
                            <>
                                <div onClick={()=>setExpandProfileMenu(false)} className={`fixed top-0 left-0 w-screen h-screen z-1`}></div>
                                <div className={`w-50 h-auto bg-[#353535] border-[#212121] absolute bottom-0 left-[calc(100%+6px)] rounded-lg z-2 overflow-hidden`}>
                                    <div className="w-50">

                                        {/* CHANGE PASSWORD */}
                                        <button className={`w-50 h-10 flex items-center transition-all duration-200 relative cursor-pointer gap-x-5.5 hover:bg-[#424242] p-2 rounded-t-lg]`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80q0 66 25 124.5t68.5 102q43.5 43.5 102 69T480-159q134 0 227-93t93-227q0-134-93-227t-227-93q-89 0-161.5 43.5T204-640h116v80H80v-240h80v80q55-73 138-116.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-240q-17 0-28.5-11.5T360-360v-120q0-17 11.5-28.5T400-520v-40q0-33 23.5-56.5T480-640q33 0 56.5 23.5T560-560v40q17 0 28.5 11.5T600-480v120q0 17-11.5 28.5T560-320H400Zm40-200h80v-40q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560v40Z"/>
                                            </svg>
                                            <h1 className="absolute top-2.5 left-10 text-sm font-semibold whitespace-nowrap">Change Password</h1>
                                        </button>

                                        {/* UPDATE PROFILE PICTURE */}
                                        <button className={`w-50 h-10 flex items-center transition-all duration-200 relative cursor-pointer gap-x-5.5 hover:bg-[#424242] p-2 rounded-t-lg]`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                                <path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z"/>
                                            </svg>
                                            <h1 className="absolute top-2.5 left-10 text-sm font-semibold whitespace-nowrap">Update Profile Picture</h1>
                                        </button>

                                        {/* LOGOUT */}
                                        <button onClick={handleLogout} className={`w-50 h-10 mt-0.5 flex items-center transition-all duration-200 relative cursor-pointer gap-x-5.5 hover:bg-[#424242] p-2 rounded-b-lg`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M16 13v-2H7V8l-5 4l5 4v-3z"/>
                                                <path fill="currentColor" d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"/>
                                            </svg>
                                            <h1 className="absolute top-2.5 left-10 text-sm font-semibold whitespace-nowrap">Logout</h1>
                                        </button>

                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation;

