import { useState } from "react";
import config from "../../../config/config";
import Alert from "../../../components/Alert";

interface Data {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface Error {
    path: string;
    msg: string;
}

function Security({id}: {id: number}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data>({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [errors, setErrors] = useState<Error[]>([]);
    const [success, setSuccess] = useState<boolean>(false);

    const validation = () => {
        setErrors([]);
        const newErrors: { path: string; msg: string }[] = [];
        if (data.currentPassword === "") {
            newErrors.push({
                path: "currentPassword",
                msg: "Current password is required."
            })
        }
        if (data.newPassword === "") {
            newErrors.push({
                path: "newPassword",
                msg: "New password is required."
            })
        }
        if (data.confirmNewPassword === "") {
            newErrors.push({
                path: "confirmNewPassword",
                msg: "Confirm new password is required."
            })
        }
        if(newErrors.length > 0) {
            console.log(newErrors)
            setErrors(newErrors);
            setLoading(false);
            return false;
        }
        
        if (data.newPassword.length < 8) {
            console.log(data.newPassword.length)
            setErrors([
                {
                    path: "newPassword",
                    msg: "New password must be at least 8 characters long."
                }
            ]);
            setLoading(false);
            return false;
        }
        if (data.newPassword !== data.confirmNewPassword) {
            setErrors([
                {
                    path: "confirmNewPassword",
                    msg: "New password and confirm new password do not match."
                }
            ]);
            setLoading(false);
            return false;
        }
        return true;
    }

    const handleUpdatePassword = async () => {
        setLoading(true);
        if (!validation()) return;

        try {
            const res = await config.put(`/auth/update-password/${id}`, data)
            if(res.status === 200) {
                setSuccess(true);
                const timer = setTimeout(() => {
                    setSuccess(false);
                }, 3000);
                () => clearTimeout(timer);
                setData({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error.response.data);
            setErrors(error.response.data.errors);
            setLoading(false);
        }
    };

    return (
        <>
            {   
                success && <Alert title="Password Reset Successful" description="Your password has been reset successfully. You can now log in with your new password." />
            }

            <div>
                <div className="mb-8">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Password</h3>
                    <div className="space-y-1">
                        <div className="space-y-3 py-2">
                            <div>
                                <label className="text-xs text-zinc-600 mb-1 block">Current password</label>
                                <input type="password" value={data.currentPassword} onChange={(e) => setData({...data, currentPassword: e.target.value})} className={"w-[calc(50%-6px)] bg-zinc-100 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-600 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"} autoComplete='off' />
                                {errors.map((err) => (
                                        err.path === "currentPassword" && <p key={err.path} className="text-xs text-red-500 mt-px">{err.msg}</p>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-zinc-600 mb-1 block">New password</label>
                                    <input type="password" value={data.newPassword} onChange={(e) => setData({...data, newPassword: e.target.value})} className={"w-full bg-zinc-100 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-600 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"} autoComplete='off' />
                                    {errors.map((err) => (
                                        err.path === "newPassword" && <p key={err.path} className="text-xs text-red-500 mt-px">{err.msg}</p>
                                    ))}
                                </div>
                                <div>
                                    <label className="text-xs text-zinc-600 mb-1 block">Confirm new password</label>
                                    <input type="password" value={data.confirmNewPassword} onChange={(e) => setData({...data, confirmNewPassword: e.target.value})} className={"w-full bg-zinc-100 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-600 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"} autoComplete='off' />
                                    {errors.map((err) => (
                                        err.path === "confirmNewPassword" && <p key={err.path} className="text-xs text-red-500 mt-px">{err.msg}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end pt-1">
                            <button onClick={handleUpdatePassword} className="px-5 py-2 text-sm text-white font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                                Update password
                                {
                                    loading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                }
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </>
    )
}

export default Security