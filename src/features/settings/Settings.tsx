import { useState } from "react";
import Tabs from "./_components/Tabs";
import Profile from "./_components/Profile";
import Security from "./_components/Security";

function Settings() {
    const [activeTab, setActiveTab] = useState("Profile");

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
    }

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
                    <Profile />
                )}

                {/* SECURITY */}
                {activeTab === "Security" && (
                    <Security />
                )}
            </div>
        </div>
    )
}

export default Settings