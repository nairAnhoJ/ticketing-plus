import { useAppSelector } from "../../../app/hooks";

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

function Profile() {
    const { user } = useAppSelector((state) => state.auth);
    const me: Me = JSON.parse(user);
    return (
        <>
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-zinc-800">
                {
                    me.avatar ? (
                        <img src={`${import.meta.env.VITE_BASE_URL}/avatar/${me.avatar}`} className="w-16 h-16 rounded-2xl" alt="avatar" />
                    )
                    :
                    (

                        <div style={{backgroundColor: me.bg_color, color: me.text_color}} className={`w-16 h-16 rounded-2xl flex items-center justify-center gap-x-px text-2xl font-bold`}>
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
                        <input type="file" id="profile-upload" className="hidden" />
                        {/* <button className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 rounded-lg transition-colors">
                            Remove
                        </button> */}
                    </div>
                </div>
            </div>
                
            <div className="flex justify-end pt-2">
                <button className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                    Save changes
                </button>
            </div>
        </>
    )
}

export default Profile