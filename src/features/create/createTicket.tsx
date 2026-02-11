import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchInChargeDepartments, fetchInchargeUser, fetchTicketCategories } from "./createTicketSlice";


const CreateTicket = () => {
    const dispatch = useAppDispatch();

    const { inchargeDepatments, ticketCategories, inchargeUsers } = useAppSelector((state) => state.createTicket);
    const [tab, setTab] = useState<number>(1);
    const [description, setDescription] = useState<string | null>(null)
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(fetchInChargeDepartments());
    }, [])

    const handleDepartmentInchargeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(fetchTicketCategories(Number(e.target.value)));
    }

    const handleTicketCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cat = ticketCategories.find(cat => cat.id === Number(e.target.value));
        setDescription(cat?.description || null);
        dispatch(fetchInchargeUser(Number(e.target.value)));
    }

    const handleTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + 'px';
    }

    const handleNext = () => {
        if(tab < 3) setTab(prev=> prev + 1)
    }

    const handleBack = () => {
        if(tab > 1){
            setTab(prev => prev - 1);
        }else{
            navigate('/')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <>
            {/* For Mobile */}
            <div className="lg:hidden w-screen h-dvh overflow-hidden flex flex-col">
                <div className="w-full h-14 bg-[#212121] flex items-center justify-between pl-3 text-white font-bold tracking-wide text-lg">
                    <button onClick={handleBack} className="h-full aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M359.33-241.33 120-480.67 359.33-720l47.34 47.33L248-514h592v66.67H248l158.67 158.66-47.34 47.34Z"/></svg>
                    </button>
                    <h1>Write a Ticket</h1>
                    <div className="w-14"></div>
                </div>
                <div className="w-full h-[calc(100%-56px)] overflow-hidden relative text-neutral-700">
                    <div className={`${tab===1?'left-0':'-left-full'} absolute top-0 w-full h-full transition-all duration-200 ease-in-out`}>
                        <div className="w-full h-full p-6">
                            <div className="h-full w-full ">
                                <h1 className="text-2xl font-bold">Request Information</h1>
                                <div className="mt-6">
                                    <div className="flex flex-col relative">
                                        <label className="text-sm">Department In-Charge</label>
                                        <select name="assigned_department_id" className="border border-neutral-400 px-3 py-2 rounded-lg outline-blue-500 appearance-none z-2">
                                            <option value="0">- - -</option>
                                        </select>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute right-3 bottom-2.5 z-1" viewBox="0 -960 960 960" fill="currentColor">
                                            <path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="flex flex-col relative">
                                        <label className="text-sm">Ticket Category</label>
                                        <select name="assigned_department_id" className="border border-neutral-400 px-3 py-2 rounded-lg outline-blue-500 appearance-none z-2">
                                            <option value="">Hardware</option>
                                        </select>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute right-3 bottom-2.5 z-1" viewBox="0 -960 960 960" fill="currentColor">
                                            <path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="text-sm">User In-Charge</label>
                                    <h1 className="leading-4.5 font-semibold">John Arian Malondras</h1>
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="text-sm">Ticket Category Remarks</label>
                                    <textarea disabled className="leading-4" value={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delecLorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec"}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${tab===1?'left-full':tab===2?'left-0':'-left-full'} absolute top-0 w-full h-full transition-all duration-200 ease-in-out pb-24`}>
                        <div className="w-full h-full p-6 overflow-x-hidden overflow-y-auto">
                            <div className="h-full w-full">
                                <h1 className="text-2xl font-bold">Ticket Details</h1>
                                <div className="flex flex-col mt-6">
                                    <label className="">Subject</label>
                                    <input type="text" name="" className="border border-neutral-400 px-3 py-2 rounded focus:outline-0" />
                                </div>
                                <div className="flex flex-col mt-3">
                                    <label className="">Description</label>
                                    <textarea onInput={handleTextArea} rows={5} name="subject" className="border border-neutral-400 px-2 py-1 rounded focus:outline-0 resize-none overflow-hidden" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${tab===3?'left-0':'left-full'} absolute top-0 w-full h-full transition-all duration-200 ease-in-out pb-24`}>
                        <div className="w-full h-full p-6 overflow-x-hidden overflow-y-auto">
                            <div className="h-full w-full">
                                <h1 className="text-2xl font-bold">Supporting Files</h1>
                                <div className="h-full w-full mt-6">
                                    <div className="h-40 w-full border-2 border-blue-500 border-dashed rounded-lg flex flex-col items-center justify-center gap-y-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-10 h-10 text-blue-500" fill="currentColor">
                                            <path d="M255.13-180q-80.62 0-137.87-56.99Q60-293.98 60-374.77q0-74.28 49.12-130.24 49.11-55.96 121.19-64.12 16.67-92 87.22-151.23 70.55-59.23 163.55-59.23 106.74 0 179.86 75.68 73.11 75.68 73.11 182.83v31.9h12.31q64.72.05 109.18 44.49Q900-400.26 900-334.72q0 63.95-45 109.33Q810-180 746.05-180H517.44q-25.79 0-44.18-18.39t-18.39-44.18v-244.51l-83.33 83.18-35.8-35.41L480-583.56l144.26 144.25-35.8 35.41-83.33-83.18v244.51q0 4.62 3.84 8.47 3.85 3.84 8.47 3.84h227.84q43.49 0 73.98-30.53 30.48-30.52 30.48-73.84 0-43.32-30.48-73.81-30.49-30.48-74.07-30.48h-61.4v-82.16q0-85.72-59.44-146.99-59.45-61.26-145.3-61.26-85.84 0-145.63 61.26-59.78 61.27-59.78 146.99h-20.36q-58.74 0-100.88 42.29-42.14 42.28-42.14 103.38 0 59.76 42.42 102.46 42.43 42.69 102.45 42.69h119.49V-180H255.13ZM480-454.87Z"/>
                                        </svg>
                                        <p className="text-sm">Select files to upload</p>
                                        <button className="px-5 py-2 bg-blue-500 text-sm text-white font-bold rounded-lg shadow shadow-blue-600">Browse Files</button>
                                    </div>
                                    <div className="w-full h-auto mt-6 flex flex-col items-center justify-center gap-y-3">
                                        <div className="w-full h-20 border border-neutral-400 rounded-lg">
                                            <div className="w-full h-full flex items-center">
                                                <div className="h-full aspect-square p-3.5">
                                                    <img src="icons/pdf.png" alt="pdf-icon" className="h-full w-full" />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <h1 className="leading-4 text-sm font-semibold whitespace-nowrap">invoice_470409006_3.pdf</h1>
                                                    <p className="text-neutral-400 text-xs leading-3.5">134 KB</p>
                                                </div>
                                                <div className="h-full aspect-square p-5.5">
                                                    <button className="w-full h-full text-red-500 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                            <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-20 border border-neutral-400 rounded-lg">
                                            <div className="w-full h-full flex items-center">
                                                <div className="h-full aspect-square p-3.5">
                                                    <img src="icons/pdf.png" alt="pdf-icon" className="h-full w-full" />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <h1 className="leading-4 text-sm font-semibold whitespace-nowrap">invoice_470409006_3.pdf</h1>
                                                    <p className="text-neutral-400 text-xs leading-3.5">134 KB</p>
                                                </div>
                                                <div className="h-full aspect-square p-5.5">
                                                    <button className="w-full h-full text-red-500 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                            <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full absolute bottom-6 flex items-center justify-end px-6 z-1">
                        <button onClick={handleNext} className="relative w-full pb-3 pt-2.75 border border-blue-400 rounded-full flex items-center justify-center bg-blue-600 text-white">
                            <span className="font-bold">{tab===3?'SUBMIT':'NEXT'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* For Desktop */}
            <div className="hidden lg:flex w-screen h-dvh overflow-hidden text-neutral-600">
                <div className="w-full h-full pl-16">
                    <form onSubmit={handleSubmit} className="w-full xl:w-250 h-full p-6">
                        <div className="w-full pb-6 flex items-center justify-between border-b border-neutral-300">
                            <h1 className="text-2xl font-bold">Write a Ticket</h1>
                            <div className="flex gap-x-3">
                                <Link to={'/'} className="bg-neutral-600 shadow shadow-neutral-700 rounded text-sm w-24 py-1.5 font-bold text-white cursor-pointer text-center">Cancel</Link>
                                <button className="bg-blue-500 shadow shadow-blue-700 rounded text-sm w-24 py-1.5 font-bold text-white cursor-pointer">Submit</button>
                            </div>
                        </div>
                        <div className="w-full h-[calc(100%-57px)] overflow-x-hidden overflow-y-auto">
                            <div className="w-full py-6 pr-6">
                                <div className="w-full flex pb-6 border-b border-neutral-400">
                                    <div className="w-2/5">
                                        <h1 className="font-bold text-xl leading-5">Request Information</h1>
                                    </div>
                                    <div className="w-3/5">
                                        <div className="flex flex-col">
                                            <label className="text-sm">Department In-Charge</label>
                                            <select onChange={(e) => handleDepartmentInchargeChange(e)} name="assigned_department_id" className="border border-neutral-400 px-1 py-1 rounded focus:outline-0">
                                                <option value="0" className="hidden">Select an option</option>
                                                {
                                                    inchargeDepatments?.map((dept, index)=>(
                                                        <>
                                                            <option key={index} value={dept.department_id}>{dept.department_name}</option>
                                                        </>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="flex flex-col mt-3">
                                            <label className="text-sm">Ticket Category</label>
                                            <select onChange={(e)=>handleTicketCategoryChange(e)} disabled={!(ticketCategories.length > 0)} name="assigned_user_id" className="border border-neutral-400 px-1 py-1 rounded focus:outline-0 disabled:opacity-60">
                                                {
                                                    (ticketCategories.length > 0) ?
                                                        ticketCategories.map((category, index)=>(
                                                            <>
                                                                <option key={index} value={category.id} className="first:hidden">{category.name}</option>
                                                            </>
                                                        ))
                                                    :
                                                    <option>Select an option</option>
                                                }
                                            </select>
                                        </div>
                                        <div className="flex flex-col mt-3">
                                            <label className="text-sm">User In-Charge</label>
                                            <div className="leading-4 font-semibold">
                                                {   
                                                    (inchargeUsers.length > 0) ?
                                                        <>
                                                            {
                                                                inchargeUsers.find(user => (user.is_primary === 1)) && (
                                                                    <>
                                                                        <h1><span className="text-sm">★ </span>{inchargeUsers.find(user => (user.is_primary === 1))?.user_name}</h1>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                inchargeUsers.map((user, index)=>(
                                                                    <>
                                                                        {   
                                                                            (user.is_primary !== 1) && (
                                                                                <p key={index} className="ml-3.75">{user.user_name}</p>
                                                                            )
                                                                        }
                                                                    </>
                                                                ))
                                                            }
                                                        </>
                                                    :
                                                    (
                                                        <>
                                                            -
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        {
                                            description && 
                                            <div className="flex flex-col mt-3">
                                                <label className="text-sm">Ticket Category Remarks</label>
                                                <h1 className="text-sm leading-3.5">{description}</h1>
                                            </div>
                                        }
                                        {/* <div className="flex flex-col mt-3">
                                            <label className="text-sm">Ticket Category Remarks</label>
                                            <h1 className="text-sm leading-3.5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nemo mollitia voluptatum eos corrupti laudantium ea, similique iusto possimus neque eaque, delec</h1>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="w-full flex py-6 border-b border-neutral-400">
                                    <div className="w-2/5">
                                        <h1 className="font-bold text-xl leading-5">Ticket Details</h1>
                                    </div>
                                    <div className="w-3/5">
                                        <div className="flex flex-col">
                                            <label className="text-sm">Subject</label>
                                            <input type="text" name="" className="border border-neutral-400 px-2 py-1 rounded focus:outline-0" />
                                        </div>
                                        <div className="flex flex-col mt-3">
                                            <label className="text-sm">Description</label>
                                            <textarea onInput={handleTextArea} rows={5} name="subject" className="border border-neutral-400 px-2 py-1 rounded focus:outline-0 resize-none overflow-hidden" />
                                        </div>
                                    </div>
                                </div> 
                                <div className="w-full flex py-6">
                                    <div className="w-2/5">  
                                        <h1 className="font-bold text-xl leading-5">Supporting Files</h1>
                                    </div>
                                    <div className="w-3/5">
                                        <div className="flex flex-col"> 
                                            <label className="text-sm">Attachment/s</label>
                                            <div className="w-full h-40 bg-blue-50 border-2 border-blue-500 border-dashed rounded-lg flex flex-col items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-9 h-9 text-blue-500" fill="currentColor">
                                                    <path d="M255.13-180q-80.62 0-137.87-56.99Q60-293.98 60-374.77q0-74.28 49.12-130.24 49.11-55.96 121.19-64.12 16.67-92 87.22-151.23 70.55-59.23 163.55-59.23 106.74 0 179.86 75.68 73.11 75.68 73.11 182.83v31.9h12.31q64.72.05 109.18 44.49Q900-400.26 900-334.72q0 63.95-45 109.33Q810-180 746.05-180H517.44q-25.79 0-44.18-18.39t-18.39-44.18v-244.51l-83.33 83.18-35.8-35.41L480-583.56l144.26 144.25-35.8 35.41-83.33-83.18v244.51q0 4.62 3.84 8.47 3.85 3.84 8.47 3.84h227.84q43.49 0 73.98-30.53 30.48-30.52 30.48-73.84 0-43.32-30.48-73.81-30.49-30.48-74.07-30.48h-61.4v-82.16q0-85.72-59.44-146.99-59.45-61.26-145.3-61.26-85.84 0-145.63 61.26-59.78 61.27-59.78 146.99h-20.36q-58.74 0-100.88 42.29-42.14 42.28-42.14 103.38 0 59.76 42.42 102.46 42.43 42.69 102.45 42.69h119.49V-180H255.13ZM480-454.87Z"/>
                                                </svg>
                                                <h1 className="text-sm">Choose a file or drag & drop it here.</h1>
                                                <button className="mt-2 bg-white border border-neutral-400 px-2 py-1 rounded text-sm font-bold cursor-pointer">Browse File</button>
                                            </div>
                                            {/* <p className="text-sm">Only support .jpg, .png, .pdf, .docx, .xlsx, .csv, .pptx files</p> */}
                                            <input type="file" name="" className="hidden" />
                                            <div className="w-full flex flex-col gap-y-2 mt-3">
                                                {/* Uploaded File */}
                                                <div className="w-full h-16 border border-neutral-400 rounded-lg">
                                                    <div className="w-full h-full flex items-center">
                                                        <div className="h-full aspect-square p-2.5">
                                                            <img src="icons/pdf.png" alt="pdf-icon" className="h-full w-full" />
                                                        </div>
                                                        <div className="flex-1 overflow-hidden">
                                                            <h1 className="leading-4 text-sm font-semibold whitespace-nowrap">invoice_470409006_3 dasfgadfgsdfgsdfgsdfgsdfgsdfgdfghdfghfdghfdghdfgh.pdf</h1>
                                                            <p className="text-neutral-400 text-xs leading-3.5">134 KB</p>
                                                        </div>
                                                        <div className="h-full aspect-square p-4.5">
                                                            <button className="w-full h-full hover:text-red-500 cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                                    <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="w-full h-16 border border-neutral-400 rounded-lg">
                                                    <div className="w-full h-full flex items-center">
                                                        <div className="h-full aspect-square p-2.5">
                                                            <img src="icons/pdf.png" alt="pdf-icon" className="h-full w-full" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h1 className="leading-4 text-sm font-semibold">invoice_470409006_3.pdf</h1>
                                                            <p className="text-neutral-400 text-xs leading-3.5">134 KB</p>
                                                        </div>
                                                        <div className="h-full aspect-square p-4.5">
                                                            <button className="w-full h-full hover:text-red-500 cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                                    <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-16 border border-neutral-400 rounded-lg">
                                                    <div className="w-full h-full flex items-center">
                                                        <div className="h-full aspect-square p-2.5">
                                                            <img src="icons/pdf.png" alt="pdf-icon" className="h-full w-full" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h1 className="leading-4 text-sm font-semibold">invoice_470409006_3.pdf</h1>
                                                            <p className="text-neutral-400 text-xs leading-3.5">134 KB</p>
                                                        </div>
                                                        <div className="h-full aspect-square p-4.5">
                                                            <button className="w-full h-full hover:text-red-500 cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                                    <path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateTicket