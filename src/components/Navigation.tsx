import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";


const Navigation = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [expandMenu, setExpandMenu] = useState<boolean>(false);
    const [expandProfileMenu, setExpandProfileMenu] = useState<boolean>(false);

    const handleExpandProfileMenu = () => {

    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }



    return (
        <>
            {/* For Mobile */}
            <button onClick={()=>setShowMenu(!showMenu)} className={`lg:hidden absolute w-8 h-8 top-3.5 right-3.5 text-white transition-all duration-200 z-2 ${showMenu && 'rotate-180'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 w-8 transition-all duration-200 ${showMenu && 'opacity-0' }`} viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 w-8 transition-all duration-200 ${!showMenu && 'opacity-0' }`} viewBox="0 -960 960 960" fill="currentColor">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </button>
            <div className={`lg:hidden fixed top-0 right-0 ${showMenu ? 'h-[225%] md:h-[250%]' : 'h-0' } overflow-hidden rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-200 bg-[#353535] aspect-square z-1`}>
                <div className={`absolute top-1/2 left-1/2  aspect-square h-[110dvh] text-white transition-all duration-250 flex flex-col gap-y-6 items-end py-20 pr-5 ${!showMenu ? 'opacity-0' : '-translate-x-full'}`}>
                        <Link to='/' className="text-5xl font-bold">Home</Link>
                        <button className="text-5xl font-bold">Ticket Report</button>
                        <button className="text-5xl font-bold">Settings</button>
                        <button onClick={handleLogout} className="text-5xl font-bold">Logout</button>
                </div>
            </div>

            {/* For Desktop */}
            <div className={`hidden lg:flex flex-col fixed top-0 left-0 bg-[#212121] h-dvh ${expandMenu?'w-52':'w-16'} p-3 transition-all duration-200 items-center justify-between`}>
                <div className="relative w-full flex justify-center">
                    <img src="/Logo.png" className="w-8" alt="logo" />
                    <button onClick={()=>setExpandMenu(!expandMenu)} className={`absolute top-10 -right-5 h-10 rounded-full flex items-center justify-center bg-[#252525] border border-[#505050] text-white cursor-pointer ${expandMenu && 'rotate-180'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24" fill="currentColor">
                            <g id="feArrowRight0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                                <g id="feArrowRight1" fill="currentColor">
                                    <path id="feArrowRight2" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>

                <div className="text-neutral-100 w-full flex flex-col gap-y-2">
                    <Link to='/' className={`${expandMenu ? 'w-46' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M8 1.4L6 2.7V1H4v3L0 6.6l.6.8L8 2.6l7.4 4.8l.6-.8z"/>
                            <path fill="currentColor" d="M8 4L2 8v7h5v-3h2v3h5V8z"/>
                        </svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold">Home</h1>
                    </Link>
                    <Link to='/' className={`${expandMenu ? 'w-46' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
                                <path d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"/><path d="M20.79 9.152C21.598 10.542 22 11.237 22 12s-.403 1.458-1.21 2.848l-1.923 3.316c-.803 1.384-1.205 2.076-1.865 2.456s-1.462.38-3.065.38h-3.874c-1.603 0-2.405 0-3.065-.38s-1.062-1.072-1.865-2.456L3.21 14.848C2.403 13.458 2 12.763 2 12s.403-1.458 1.21-2.848l1.923-3.316C5.936 4.452 6.338 3.76 6.998 3.38S8.46 3 10.063 3h3.874c1.603 0 2.405 0 3.065.38s1.062 1.072 1.865 2.456z"/>
                            </g>
                        </svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold">Settings</h1>
                    </Link>
                    <Link to='/' className={`${expandMenu ? 'w-46' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-2 rounded-lg`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 32">
                            <path fill="currentColor" d="M10 18h8v2h-8zm0-5h12v2H10zm0 10h5v2h-5z"/>
                            <path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"/>
                        </svg>
                        <h1 className="absolute top-2.5 left-10 text-sm font-semibold whitespace-nowrap">Ticket Report</h1>
                    </Link>
                </div>

                <div className="text-neutral-100 w-full flex flex-col gap-y-5">
                    <div className="relative">
                        <button onClick={handleExpandProfileMenu} className={`${expandMenu ? 'w-46' : 'w-10'} h-10 transition-all duration-200 relative overflow-hidden cursor-pointer gap-x-5.5 hover:bg-[#353535] p-1 rounded-lg`}>
                            <img src="default-avatar.jpg" className="w-8 h-8 rounded-full" alt="avatar" />
                            <div className="absolute flex justify-between w-33 top-1.5 left-11 text-sm text-left">
                                <div>
                                    <h1 className="font-semibold leading-4">{JSON.parse(user).name}</h1>
                                    <p className="text-xs leading-3">{JSON.parse(user).department}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <g id="feArrowRight0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                                        <g id="feArrowRight1" fill="currentColor">
                                            <path id="feArrowRight2" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </button>
                        <div onClick={()=>setExpandProfileMenu(false)} className={`fixed top-0 left-0 w-screen h-screen z-1`}></div>
                        <div className="w-46 h-10 bg-[#353535] border-[#212121] absolute top-0 left-[calc(100%+6px)] rounded-lg z-2">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation;

