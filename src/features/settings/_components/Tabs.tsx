import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";

interface Me {
    id: number;
    role: string;
}

const tabs = ["Profile", "Security"];

interface TabsProps {
    changeTab: (tab: string) => void;
}

function Tabs({ changeTab }: TabsProps) {
    const { user } = useAppSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState<string>('Profile');
    const me: Me = JSON.parse(user);

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
        changeTab(tab);
    }

    return (
        <div className="max-w-4xl mx-auto px-6 flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
                <button key={tab} onClick={() => handleChangeTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab
                            ? "border-indigo-500 text-indigo-500"
                            : "border-transparent text-zinc-600 hover:text-zinc-500"
                        }`}
                    >
                    {tab}
                </button>
            ))}
            {
                me.role === "superuser" && (
                    <button onClick={() => handleChangeTab("System Settings")}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === "System Settings"
                                ? "border-indigo-500 text-indigo-500"
                                : "border-transparent text-zinc-600 hover:text-zinc-500"
                            }`}
                        >
                        System Settings
                    </button>
                )
            }
        </div>
    )
}

export default Tabs