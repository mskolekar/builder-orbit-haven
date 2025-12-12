import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubmissionSidebar } from "@/components/ui/submission-sidebar";

function SubmissionHeader() {
  const submissionInfo = {
    id: "OrgName_97828",
    dates: "11-24-2025 - 11-24-2026",
    state: "AK",
    code: "XPE-016135 : 01",
    status: "InProgress",
    type: "New Submission",
  };

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0054A6] to-[#003d7a] text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold">Submission:</span>
          <span>{submissionInfo.id}</span>
          <span className="text-white/70">|</span>
          <span>{submissionInfo.dates}</span>
          <span className="text-white/70">|</span>
          <span>{submissionInfo.state}</span>
          <span className="text-white/70">|</span>
          <span>{submissionInfo.code}</span>
          <span className="text-white/70">|</span>
          <span>
            Status:{" "}
            <span className="font-semibold">{submissionInfo.status}</span> -{" "}
            {submissionInfo.type}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Submissions() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState<string | undefined>(undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleTabChange = (tabId: string, subTabId?: string) => {
    setActiveTab(tabId);
    setActiveSubTab(subTabId);
  };

  return (
    <div className="flex-1 flex flex-col">
      <SubmissionHeader />
      <div className="flex flex-1 overflow-hidden">
        <SubmissionSidebar
          isCollapsed={isSidebarCollapsed}
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          onTabChange={handleTabChange}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-700 hover:bg-gray-100 p-1 h-8 w-8"
              title={
                isSidebarCollapsed ? "Expand Panel" : "Collapse Panel"
              }
            >
              {isSidebarCollapsed ? (
                <Menu size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </Button>
            <h2 className="text-sm font-semibold text-gray-900">
              {activeTab.replace(/-/g, " ").toUpperCase()}
              {activeSubTab && ` - ${activeSubTab.replace(/-/g, " ").toUpperCase()}`}
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Content for {activeTab} tab</p>
          </div>
        </div>
      </div>
    </div>
  );
}
