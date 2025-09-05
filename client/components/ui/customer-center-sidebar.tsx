import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

interface SubItem {
  label: string;
  path: string;
}

interface CustomerCenterSidebarItem {
  label: string;
  path: string;
  subItems?: SubItem[];
}

const customerCenterItems: CustomerCenterSidebarItem[] = [
  { label: "Overview", path: "/overview" },
  {
    label: "Personal Details",
    path: "/personal-details",
    subItems: [
      { label: "Basic Info", path: "/profile?section=person-info" },
      { label: "Addresses", path: "/profile?section=addresses" },
      { label: "Contact Info", path: "/contact-delivery?tab=contact" },
      { label: "Additional Info", path: "/profile?section=additional-info" },
      { label: "Work History", path: "/profile?section=person-history" },
    ],
  },
  {
    label: "Loss History",
    path: "/loss-history",
    subItems: [
      { label: "Prior Policy", path: "/loss-history?tab=prior-policy" },
      { label: "Prior Losses", path: "/loss-history?tab=prior-losses" },
    ],
  },
  { label: "Relationships & Roles", path: "/relationships" },
  { label: "Workgroups", path: "/workgroups" },
  {
    label: "Journals",
    path: "/journals",
    subItems: [
      { label: "Diaries", path: "/journals?tab=diaries" },
      { label: "Notes", path: "/journals?tab=notes" },
      { label: "Document", path: "/journals?tab=document" },
      { label: "Email", path: "/journals?tab=email" },
      {
        label: "Assignment/Approval History",
        path: "/journals?tab=assignment-approval",
      },
    ],
  },
  { label: "Financials", path: "/financials" },
];

interface CustomerCenterSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function CustomerCenterSidebar({
  isCollapsed,
  onToggleCollapse,
}: CustomerCenterSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const getBreadcrumb = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    const tab = searchParams.get("tab");

    // Find the main menu item
    const mainItem = customerCenterItems.find((item) => {
      if (item.path === "/") return path === "/";
      return path.startsWith(item.path);
    });

    if (!mainItem) return "Overview";

    let breadcrumb = mainItem.label;

    // If there's a section or tab, find the sub-item
    if ((section || tab) && mainItem.subItems) {
      const subItem = mainItem.subItems.find((sub) => {
        const subParams = new URLSearchParams(sub.path.split("?")[1] || "");
        return (
          subParams.get("section") === section || subParams.get("tab") === tab
        );
      });
      if (subItem) {
        breadcrumb += ` > ${subItem.label}`;
      }
    }

    return breadcrumb;
  };

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemPath)
        ? prev.filter((path) => path !== itemPath)
        : [...prev, itemPath],
    );
  };

  const isActive = (path: string) => {
    if (path === "/overview") {
      return location.pathname.startsWith("/overview");
    }
    return (
      location.pathname === path || location.pathname + location.search === path
    );
  };

  const isMainPageActive = (item: CustomerCenterSidebarItem) => {
    if (item.path === "/overview") {
      return location.pathname.startsWith("/overview");
    }
    return location.pathname === item.path;
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
        aria-label="Customer Center Navigation"
      >
        <ul className="space-y-1" role="menubar">
          {customerCenterItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMainActive = isMainPageActive(item);
            const isExpanded = expandedItems.includes(item.path);

            return (
              <li key={item.path}>
                <button
                  onClick={(e) => {
                    if (hasSubItems && !isCollapsed) {
                      e.preventDefault();
                      toggleExpanded(item.path);
                    } else {
                      // Navigate to the route if no sub-items or if collapsed
                      const match =
                        location.pathname.match(/^\/overview\/([^/]+)/);
                      const profile = match ? match[1] : "olivia";
                      const target =
                        item.path === "/overview"
                          ? `/overview/${profile}`
                          : item.path;
                      window.location.href = target;
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg text-sm transition-colors w-full",
                    isCollapsed
                      ? "justify-center p-2"
                      : "justify-between gap-3 px-3 py-2",
                    isMainActive && !location.search
                      ? "bg-white text-[#0054A6]"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  )}
                  title={isCollapsed ? item.label : undefined}
                  aria-label={item.label}
                  aria-expanded={hasSubItems ? isExpanded : undefined}
                  aria-haspopup={hasSubItems ? "menu" : undefined}
                >
                  {isCollapsed ? (
                    <span className="text-xs font-medium">
                      {item.label.substring(0, 2).toUpperCase()}
                    </span>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        {item.label}
                      </div>
                      {hasSubItems &&
                        (isExpanded ? (
                          <ChevronDown size={14} />
                        ) : (
                          <ChevronRight size={14} />
                        ))}
                    </>
                  )}
                </button>

                {hasSubItems && isExpanded && !isCollapsed && (
                  <ul className="mt-1 ml-6 space-y-1">
                    {item.subItems!.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={cn(
                            "block px-3 py-1.5 text-xs rounded transition-colors border-l-2 border-white/20 pl-4",
                            isActive(subItem.path)
                              ? "bg-white/15 text-white border-white/40"
                              : "text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30",
                          )}
                          role="menuitem"
                          aria-label={subItem.label}
                        >
                          {subItem.label}
                        </Link>
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
