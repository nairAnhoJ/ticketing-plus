import { useState, type ChangeEvent } from "react";
import config from "../../../config/config";
import { useAppDispatch } from "../../../app/hooks";
import { fetchUser } from "../../auth/authSlice";

interface Me {
    id: number;
    department: string;
    department_id: number;
    name: string;
    first_name: string;
    last_name: string;
    text_color: string;
    bg_color: string;
    avatar: string | null;
}

function Profile({me}: {me: Me}) {
    const appDispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<any>()
    const [preview, setPreview] = useState<string | null>(null);

    const handleChangeProfile = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(objectUrl);

            setAvatar(e.target.files[0]);
        }
    }

    const handleSaveChanges = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', avatar);

        config.put('/users/update-avatar', formData)
            .then((res) => {
                if(res.status === 201){
                    appDispatch(fetchUser(me.id));
                }
                console.log(res)
            })
            .catch((err) => console.log(err))
            .finally(()=> {setLoading(false); setPreview(null)})
    }

    return (
        <>
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-zinc-800">
                {
                    preview ?
                        <img src={preview} className="w-16 h-16 rounded-2xl" alt="avatar" />
                    :
                        me.avatar ? (
                            <img src={`${import.meta.env.VITE_BASE_URL}/avatar/${me.avatar}`} className="w-16 h-16 rounded-2xl" alt="avatar" />
                        )
                        :
                        (
                            // <div style={{backgroundColor: me.bg_color, color: me.text_color}} className={`w-16 h-16 rounded-2xl flex items-center justify-center gap-x-px text-2xl font-bold`}>
                            //     <span>{me.first_name[0].toUpperCase()}</span>
                            //     <span>{me.last_name[0].toUpperCase()}</span>
                            // </div>
                            <div className={`w-16 h-16 bg-[#212121] text-white rounded-2xl flex items-center justify-center gap-x-px text-2xl font-bold`}>
                                <span>{me.first_name[0].toUpperCase()}</span>
                                <span>{me.last_name[0].toUpperCase()}</span>
                            </div>
                        )    
                }
                <div>
                    <p className="text-sm font-medium text-zinc-700 mb-1">Profile photo</p>
                    <p className="text-xs text-zinc-600 mb-3">JPG, PNG</p>
                    <div className="flex gap-2">
                        <label htmlFor="profile-upload" className="px-3 py-1.5 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                            Upload
                        </label>
                        <input onChange={handleChangeProfile} type="file" id="profile-upload" accept="image/*" className="hidden" />
                        {/* <button className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 rounded-lg transition-colors">
                            Remove
                        </button> */}
                    </div>
                </div>
            </div>
                
            <div className="flex justify-end pt-2">
                <button disabled={!preview || loading} onClick={handleSaveChanges} className="w-32 h-10 flex items-center justify-center text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {
                        loading ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 animate-spin" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
                        :
                        <span>Save Changes</span>
                    }
                </button>
            </div>
        </>
    )
}

export default Profile