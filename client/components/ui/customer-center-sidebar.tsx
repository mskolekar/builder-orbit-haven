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
  { label: "Person Info", path: "/person-info" },
  { label: "Additional Info", path: "/additional-info" },
  { label: "Licenses", path: "/licenses-certifications" },
  { label: "Work Groups", path: "/workgroups" },
  { label: "Relationship & Roles", path: "/relationships" },
  { label: "Prior Policy", path: "/prior-policy" },
  { label: "Prior Losses", path: "/prior-losses" },
  { label: "Login Info", path: "/login-info" },
  { label: "Upload Sign", path: "/upload-sign" },
  { label: "Journal", path: "/journals" },
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

  // Extract active profile from URL
  const overviewMatch = location.pathname.match(/^\/overview\/([^/]+)/);
  const activeProfileKey = overviewMatch ? overviewMatch[1] : "olivia";

  const getBreadcrumb = () => {
    const path = location.pathname;

    // Find the main menu item
    const mainItem = customerCenterItems.find((item) => {
      if (item.path === "/") return path === "/";
      return path.startsWith(item.path);
    });

    return mainItem ? mainItem.label : "Overview";
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
    return location.pathname === path;
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
            const isMainActive = isMainPageActive(item);
            const isExternalLink = item.label === "Journal";

            return (
              <li key={item.path}>
                {isExternalLink ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center rounded-lg text-sm transition-colors w-full",
                      isCollapsed
                        ? "justify-center p-2"
                        : "justify-between gap-3 px-3 py-2",
                      "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    )}
                    title={isCollapsed ? item.label : undefined}
                    aria-label={item.label}
                  >
                    {isCollapsed ? (
                      <span className="text-xs font-medium">
                        {item.label.substring(0, 2).toUpperCase()}
                      </span>
                    ) : (
                      <div className="flex items-center gap-3">
                        {item.label}
                      </div>
                    )}
                  </a>
                ) : (
                  <Link
                    to={
                      item.path === "/overview"
                        ? `/overview/${activeProfileKey}`
                        : item.path
                    }
                    className={cn(
                      "flex items-center rounded-lg text-sm transition-colors w-full",
                      isCollapsed
                        ? "justify-center p-2"
                        : "justify-between gap-3 px-3 py-2",
                      isMainActive
                        ? "bg-[#6F7C88] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    )}
                    title={isCollapsed ? item.label : undefined}
                    aria-label={item.label}
                  >
                    {isCollapsed ? (
                      <span className="text-xs font-medium">
                        {item.label.substring(0, 2).toUpperCase()}
                      </span>
                    ) : (
                      <div className="flex items-center gap-3">
                        {item.label}
                      </div>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
