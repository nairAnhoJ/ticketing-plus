import { useEffect, useState } from "react";
import { completeTicket } from "../inboxSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import config from "../../../config/config";

interface User {
    id: number;
    name: string;
}

interface Me {
    id: number;
    department_id: number;
}

const ReassignModal = ({id, assigned_user_id, close}: {id: number | undefined, assigned_user_id: number, close: () => void}) => {
    const dispatch = useAppDispatch();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const [res, setRes] = useState<string>('');
    const [files, setFiles] = useState<any>([]);
    const [resError, setResError] = useState<boolean>(false)

    const fetchUsers = async () => {
        try {
            const response = await config(`/users/department`);
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        if(res){
            setResError(false)
            const formData = new FormData();
            formData.append('resolution', res);
            files.forEach((file: any) => {
                formData.append(`files`, file);
            });
            if(id){
                formData.append('id', id.toString());
                try {
                    await dispatch(completeTicket(formData));
                    close();
                } catch (error) {
                    console.log(error)
                }
            }
        }else{
            setResError(true)
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral-900/25 z-50">
            <div className="w-auto h-auto bg-white text-neutral-600 rounded">
                <div className="p-6 flex items-center gap-x-2">
                    <div className="w-9 h-9 p-2 bg-emerald-300/80 rounded-full text-emerald-600">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM3 8C3 5.23858 5.23858 3 8 3H11V5H8C6.34315 5 5 6.34315 5 8V11H3V8ZM21 13H19V16C19 17.6569 17.6569 19 16 19H13V21H16C18.7614 21 21 18.7614 21 16V13Z"></path></svg>
                    </div>

                    <h1 className="font-semibold">Reassign Ticket?</h1>
                </div>
                <div className="w-140 px-6">
                    <div className="flex flex-col">
                        <label className="text-sm">Assignee <span className="italic text-red-500">*</span></label>
                        <select onChange={(e) => setSelectedUser(Number(e.target.value))} className={`border  px-1 py-1 rounded focus:outline-0 ${error ? 'border-red-400' : 'border-neutral-400'}`}>
                            <option value={''} className="hidden">Select an option</option>
                            {
                                users?.map((user, index)=>(
                                    <>
                                        {
                                            (user.id !== assigned_user_id) && 
                                            <option key={index} value={user.id}>{user.name}</option>
                                        }
                                        {/* <option key={index} value={userOptions.id}>{userOptions.name}</option> */}
                                    </>
                                ))
                            }
                        </select>
                    </div>
                    <div className="text-sm mt-6">Are you sure you want to reassign this ticket?</div>
                </div>
                <div className="p-6 flex items-center justify-end gap-x-3">
                    <button onClick={close} className="w-20 h-9 border border-neutral-400 hover:border-neutral-500 rounded text-sm font-semibold">Cancel</button>
                    <button onClick={handleSubmit} className="w-20 h-9 border border-emerald-400 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-semibold">Yes</button>
                </div>
            </div>
        </div>
    )
}

export default ReassignModal