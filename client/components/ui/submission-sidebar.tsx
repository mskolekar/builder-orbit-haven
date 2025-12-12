import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubmissionTab {
  id: string;
  label: string;
  subTabs?: { id: string; label: string }[];
}

const submissionTabs: SubmissionTab[] = [
  { id: "overview", label: "Overview" },
  { id: "uw-questions", label: "UW Questions" },
  { id: "additional-interests", label: "Additional Interests" },
  { id: "exposures", label: "Exposures" },
  { id: "manual-multi-rating", label: "Manual Multi Rating" },
  { id: "inclusions-exclusions", label: "Inclusions/Exclusions" },
  { id: "quotations", label: "Quotations" },
  { id: "parties", label: "Parties" },
  { id: "journal", label: "Journal" },
  {
    id: "submission",
    label: "Submission",
    subTabs: [
      { id: "summary", label: "Summary" },
      { id: "reinsurance", label: "Reinsurance" },
    ],
  },
];

interface SubmissionSidebarProps {
  isCollapsed: boolean;
  activeTab: string;
  activeSubTab?: string;
  onTabChange: (tabId: string, subTabId?: string) => void;
  onToggleCollapse: () => void;
}

export function SubmissionSidebar({
  isCollapsed,
  activeTab,
  activeSubTab,
  onTabChange,
  onToggleCollapse,
}: SubmissionSidebarProps) {
  const [expandedTabs, setExpandedTabs] = useState<string[]>([]);

  const toggleExpanded = (tabId: string) => {
    setExpandedTabs((prev) =>
      prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [tabId],
    );
  };

  const handleTabClick = (tab: SubmissionTab) => {
    if (tab.subTabs && tab.subTabs.length > 0) {
      toggleExpanded(tab.id);
    } else {
      onTabChange(tab.id);
    }
  };

  return (
    <div
      className={cn(
        "h-full bg-gradient-to-b from-[#0054A6] to-[#003d7a] text-white flex flex-col shadow-sm transition-all duration-300",
        isCollapsed ? "w-0 overflow-hidden" : "w-64",
      )}
    >
      <nav
        className="flex-1 px-3 pt-4 pb-4 overflow-y-auto"
        role="navigation"
        aria-label="Submission Navigation"
      >
        <ul className="space-y-1" role="menubar">
          {submissionTabs.map((tab) => {
            const hasSubTabs = tab.subTabs && tab.subTabs.length > 0;
            const isMainActive = activeTab === tab.id;
            const isExpanded = expandedTabs.includes(tab.id);

            return (
              <li key={tab.id}>
                <button
                  onClick={() => handleTabClick(tab)}
                  className={cn(
                    "flex items-center rounded-lg text-sm transition-colors w-full",
                    isCollapsed
                      ? "justify-center p-2"
                      : "justify-between gap-3 px-3 py-2",
                    // Tab with expanded subtabs: light grey background, dark text
                    hasSubTabs && isExpanded
                      ? "bg-[#EEF1F6] text-[#2F3A45]"
                      : // Active tab without subtabs: dark grey background, white text
                        !hasSubTabs && isMainActive
                        ? "bg-[#6F7C88] text-white"
                        : // Inactive: light blue text on hover, transparent background
                          "text-white/80 hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                  )}
                  title={isCollapsed ? tab.label : undefined}
                  aria-label={tab.label}
                  aria-expanded={hasSubTabs ? isExpanded : undefined}
                  aria-haspopup={hasSubTabs ? "menu" : undefined}
                >
                  {isCollapsed ? (
                    <span className="text-xs font-medium">
                      {tab.label.substring(0, 2).toUpperCase()}
                    </span>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">{tab.label}</div>
                      {hasSubTabs &&
                        (isExpanded ? (
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-colors",
                              isMainActive && hasSubTabs
                                ? "text-white"
                                : "text-white/80",
                            )}
                          />
                        ) : (
                          <ChevronRight
                            size={14}
                            className={cn(
                              "transition-colors",
                              isMainActive && hasSubTabs
                                ? "text-white"
                                : "text-white/80",
                            )}
                          />
                        ))}
                    </>
                  )}
                </button>

                {hasSubTabs && isExpanded && !isCollapsed && (
                  <ul className="mt-1 ml-2 space-y-1">
                    {tab.subTabs!.map((subTab) => {
                      const isSubActive =
                        activeTab === tab.id && activeSubTab === subTab.id;
                      return (
                        <li key={subTab.id}>
                          <button
                            onClick={() => onTabChange(tab.id, subTab.id)}
                            className={cn(
                              "block w-full text-left px-3 py-2 text-sm rounded transition-colors",
                              isSubActive
                                ? "bg-[#6F7C88] text-white"
                                : "text-white/70 hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                            )}
                            role="menuitem"
                            aria-label={subTab.label}
                          >
                            {subTab.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
