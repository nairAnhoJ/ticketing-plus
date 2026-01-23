import { useEffect, useState } from "react"
import { loginUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Data {
    id_number: string;
    password: string;
}

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { errors, token } = useAppSelector((state) => state.auth)

    const [data, setData] = useState<Data>({
        id_number: '',
        password: ''
    })

    useEffect(()=>{
        console.log(token)
        if(token){
            navigate('/');
        }
    },[token])

    useEffect(()=>{
        console.log(errors)
    },[])

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);


    return (
        <>
            <div className="w-screen h-[100dvh] overflow-hidden bg-[#CEDEF1] text-gray-700 flex flex-col">
                <div className="w-15 h-15 p-3">
                    <img src="/Logo.png" alt="logo" className="h-full" />
                    {/* <p className="text-xl font-bold text-red-600/80">Ticketing+</p> */}
                </div>
                <div className="flex-1">
                    <div className="w-full h-full p-6 flex items-center justify-center">
                        <div className="p-6 border border-neutral-400/30 shadow-xl rounded w-full md:w-96 bg-white/70">
                            <form className="w-full h-full flex flex-col items-center">
                                <h1 className="font-bold text-2xl">LOGIN</h1>
                                {
                                    errors?.find((err) => err.path === 'all') && 
                                    <div className="border border-red-600 bg-red-500/90 rounded text-white px-3 py-2 mt-3 ">
                                        { errors?.find((err) => err.path === 'all')?.msg }
                                    </div>
                                }
                                <div className="w-full h-full mt-6 text-gray-500">
                                    {/* ID Number Input */}
                                    <div className="relative w-full">
                                        <input type="text" onChange={(e)=>setData({...data, id_number: e.target.value})} value={data.id_number} className="bg-[#EFF3F6] w-full h-10 pl-15.5 pr-3 border border-gray-300 shadow-inner rounded focus:outline-0"/>
                                        <p className="absolute top-2 left-9">HII-</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-1.5 top-1.5 h-7" viewBox="0 -960 960 960" fill="currentColor">
                                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                        </svg>
                                        {
                                            errors?.find((err) => err.path === 'id_number') && <p className="text-sm italic text-red-500">{errors?.find((err) => err.path === 'id_number')?.msg}</p>
                                        }
                                    </div>
                                    {/* Password Input */}
                                    <div className="relative w-full mt-3">
                                        <input type={(passwordVisibility) ? "text" : "password"} onChange={(e)=>setData({...data, password: e.target.value})} value={data.password} className="bg-[#EFF3F6] w-full h-10 pl-9 pr-9 border border-gray-300 shadow-inner rounded focus:outline-0"/>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-2 h-6" viewBox="0 -960 960 960" fill="currentColor">
                                            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                                        </svg>
                                        {/* Password Visibility Button */}
                                        <button type="button" onClick={()=>setPasswordVisibility(!passwordVisibility)} className="absolute right-2 top-2 h-6 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                {
                                                    passwordVisibility ? 
                                                        <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                                                    : 
                                                        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                                                }
                                            </svg>
                                        </button>
                                    </div>
                                    {
                                        errors?.find((err) => err.path === 'password') && <p className="text-sm italic text-red-500">{errors?.find((err) => err.path === 'password')?.msg}</p>
                                    }
                                </div>
                                <div className="w-full mt-6">
                                    <button onClick={()=>dispatch(loginUser(data))} type="button" className="w-full py-2 bg-gray-600 rounded text-white font-bold tracking-wide cursor-pointer">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default LoginPage