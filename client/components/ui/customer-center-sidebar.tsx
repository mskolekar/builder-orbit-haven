import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
  { label: "Profile", path: "/profile" },
  { label: "Contact & Communication", path: "/contact-delivery" },
  { label: "Relationships", path: "/relationships" },
  { label: "Licenses & Certifications", path: "/licenses-certifications" },
  { label: "Financials (LawPro only)", path: "/financials" },
  { label: "Associated Records", path: "/associated-records" },
  { label: "Journal", path: "/journals" },
  { label: "Login Info", path: "/login-info" },
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
    setExpandedItems(
      (prev) =>
        prev.includes(itemPath)
          ? prev.filter((path) => path !== itemPath)
          : [itemPath], // Only one submenu expanded at a time
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
    if (item.path === "/personal-details") {
      return (
        location.pathname === item.path ||
        location.pathname === "/communication"
      );
    }
    return location.pathname === item.path;
  };

  // Check if a submenu item is active (accounts for query params)
  const isSubmenuActive = (subItem: SubItem) => {
    return location.pathname + location.search === subItem.path;
  };

  return (
    <div
      className={cn(
        "h-full bg-white text-gray-700 flex flex-col shadow-sm border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-0 overflow-hidden" : "w-64",
      )}
    >
      <nav
        className="px-3 pt-4 pb-4"
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
                    // Main menu with expanded submenus: light grey background, dark text
                    hasSubItems && isExpanded
                      ? "bg-gray-100 text-gray-900"
                      : // Active main menu without submenus: dark grey background, white text
                        !hasSubItems && isMainActive && !location.search
                        ? "bg-[#6F7C88] text-white"
                        : // Inactive: grey text on hover, light grey background on hover
                          "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
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
                      {hasSubItems && (
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform",
                            isExpanded ? "rotate-180" : "",
                            isMainActive && hasSubItems
                              ? "text-gray-700"
                              : "text-gray-600",
                          )}
                        />
                      )}
                    </>
                  )}
                </button>

                {hasSubItems && isExpanded && !isCollapsed && (
                  <ul className="mt-1 ml-2 space-y-1">
                    {item.subItems!.map((subItem) => {
                      const isSubActive = isSubmenuActive(subItem);
                      return (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              "block px-3 py-2 text-sm rounded transition-colors",
                              isSubActive
                                ? "bg-[#6F7C88] text-white pl-3"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 pl-3",
                            )}
                            role="menuitem"
                            aria-label={subItem.label}
                          >
                            {subItem.label}
                          </Link>
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
