import { useState } from "react";

const tabs = ["Profile", "Security"];

interface TabsProps {
    changeTab: (tab: string) => void;
}

function Tabs({ changeTab }: TabsProps) {
    const [activeTab, setActiveTab] = useState<string>('Profile');

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
        </div>
    )
}

export default Tabs