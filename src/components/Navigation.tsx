import { useState } from "react";


const Navigation = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

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
                        <button className="text-5xl font-bold">Ticket Report</button>
                        <button className="text-5xl font-bold">Settings</button>
                        <button onClick={handleLogout} className="text-5xl font-bold">Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navigation;