import { useState } from "react";
import Tabs from "./_components/Tabs";
import Profile from "./_components/Profile";
import Security from "./_components/Security";
import { useAppSelector } from "../../app/hooks";

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

function Settings() {
    const [activeTab, setActiveTab] = useState("Profile");

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
    }
    
    const { user } = useAppSelector((state) => state.auth);
    const me: Me = JSON.parse(user);

    return (
        <div className="min-h-screen text-neutral-700" >
            {/* Header */}
            <div className="border-b border-zinc-800">
                <div className="max-w-4xl mx-auto px-6 py-5 flex items-center">
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs changeTab={handleChangeTab} />
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* PROFILE */}
                {activeTab === "Profile" && (
                    <Profile me={me}/>
                )}

                {/* SECURITY */}
                {activeTab === "Security" && (
                    <Security id={me.id}/>
                )}
            </div>
        </div>
    )
}

export default Settings