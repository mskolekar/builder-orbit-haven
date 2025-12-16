import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionSidebarItem {
  label: string;
  id: string;
  subItems?: SubmissionSidebarItem[];
}

const submissionMenuItems: SubmissionSidebarItem[] = [
  { label: "Basic Details", id: "overview" },
  { label: "UW Questions", id: "uw-questions" },
  { label: "Additional Interests", id: "additional-interests" },
  { label: "Exposures", id: "exposures" },
  { label: "Manual Multi Rating", id: "manual-multi-rating" },
  { label: "Inclusions/Exclusions", id: "inclusions-exclusions" },
  {
    label: "Quotations",
    id: "quotations",
    subItems: [
      { label: "Pricing", id: "quotations-pricing" },
      { label: "Subjectivity", id: "quotations-subjectivity" },
      { label: "Proposal", id: "quotations-proposal" },
      { label: "Forms", id: "quotations-forms" },
      { label: "Bind", id: "quotations-bind" },
    ],
  },
  { label: "Parties", id: "parties" },
  {
    label: "Journal",
    id: "journal",
    subItems: [
      { label: "Document", id: "journal-document" },
      { label: "Email", id: "journal-email" },
      { label: "Diaries", id: "journal-diaries" },
    ],
  },
];

interface SubmissionSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isCollapsed: boolean;
}

export function SubmissionSidebar({
  activeTab,
  onTabChange,
  isCollapsed,
}: SubmissionSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isSubitemActive = (item: SubmissionSidebarItem): boolean => {
    if (item.subItems) {
      return item.subItems.some((sub) => sub.id === activeTab);
    }
    return false;
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
          {submissionMenuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMainActive = activeTab === item.id;
            const isSubActive = isSubitemActive(item);
            const isExpanded = expandedItems.includes(item.id);

            return (
              <li key={item.id}>
                <div>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      if (item.subItems) {
                        toggleExpanded(item.id);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-lg text-sm transition-colors w-full px-3 py-2",
                      isMainActive
                        ? "bg-[#6F7C88] text-white"
                        : isSubActive
                          ? "bg-[#EEF1F6] text-[#2F3A45]"
                          : "text-white/80 hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                    )}
                    title={isCollapsed ? item.label : undefined}
                    aria-label={item.label}
                    aria-expanded={hasSubItems ? isExpanded : undefined}
                    aria-haspopup={hasSubItems ? "menu" : undefined}
                  >
                    <span>{item.label}</span>
                    {hasSubItems && (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform flex-shrink-0",
                          isExpanded ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>
                </div>
                {item.subItems && expandedItems.includes(item.id) && (
                  <ul className="mt-1 space-y-1 ml-4">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => onTabChange(subItem.id)}
                          className={cn(
                            "flex items-center rounded-lg text-sm transition-colors w-full px-3 py-2",
                            activeTab === subItem.id
                              ? "bg-[#6F7C88] text-white"
                              : "text-white/80 hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                          )}
                          aria-label={subItem.label}
                        >
                          {subItem.label}
                        </button>
                      </li>
                    ))}
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
