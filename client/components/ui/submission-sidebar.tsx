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
}

export function SubmissionSidebar({
  activeTab,
  onTabChange,
  isCollapsed,
}: SubmissionSidebarProps) {
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
          {submissionMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center rounded-lg text-sm transition-colors w-full gap-3 px-3 py-2",
                  activeTab === item.id
                    ? "bg-[#6F7C88] text-white"
                    : "text-white/80 hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                )}
                title={isCollapsed ? item.label : undefined}
                aria-label={item.label}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
