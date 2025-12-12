import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionSidebarItem {
  label: string;
  id: string;
}

const submissionMenuItems: SubmissionSidebarItem[] = [
  { label: "Overview", id: "overview" },
  { label: "UW Questions", id: "uw-questions" },
  { label: "Additional Interests", id: "additional-interests" },
  { label: "Exposures", id: "exposures" },
  { label: "Manual Multi Rating", id: "manual-multi-rating" },
  { label: "Inclusions/Exclusions", id: "inclusions-exclusions" },
  { label: "Quotations", id: "quotations" },
  { label: "Parties", id: "parties" },
  { label: "Journal", id: "journal" },
];

interface SubmissionSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SubmissionSidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
}: SubmissionSidebarProps) {
  return (
    <div
      className={cn(
        "bg-blue-600 text-white transition-all duration-300 overflow-hidden flex flex-col",
        isCollapsed ? "w-0" : "w-64"
      )}
    >
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {submissionMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full text-left px-4 py-2 rounded transition-colors",
                activeTab === item.id
                  ? "bg-white/20 text-white font-semibold"
                  : "text-white/80 hover:bg-white/10"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
