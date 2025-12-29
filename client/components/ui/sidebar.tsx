import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  User,
  MessageCircle,
  Users,
  Link as LinkIcon,
  CreditCard,
  History,
  Menu,
  X,
  Home,
  FileText,
  Briefcase,
  Shield,
  Settings,
  BarChart,
  TrendingUp,
  Search,
  ChevronLeft,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface SubItem {
  label: string;
  path: string;
}

interface SidebarItem {
  icon: any;
  label: string;
  path: string;
  subItems?: SubItem[];
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: FileText, label: "Submissions", path: "/submissions" },
  { icon: AlertCircle, label: "Incidents", path: "/incidents" },
  { icon: Shield, label: "Policies", path: "/policies" },
  {
    icon: User,
    label: "Customer Center",
    path: "/customer-center",
  },
  {
    icon: Briefcase,
    label: "Accounting",
    path: "/accounting",
    subItems: [
      { label: "Record Payment", path: "/accounting/record-payment" },
      { label: "Check Printing", path: "/accounting/check-printing" },
      { label: "Invoicing", path: "/accounting/invoicing" },
    ],
  },
  { icon: Search, label: "Search Center", path: "/search" },
  { icon: Settings, label: "Other Utilities", path: "/utilities" },
  { icon: LinkIcon, label: "Quick Links", path: "/links" },
  {
    icon: TrendingUp,
    label: "Bulk Change Endorsements",
    path: "/bulk-changes",
  },
  { icon: Users, label: "Manage Users", path: "/users" },
  { icon: BarChart, label: "Analytic Reports", path: "/reports" },
  {
    icon: Zap,
    label: "Rapid Claims",
    path: "/rapid-claims",
    subItems: [
      { label: "Bulk Payments", path: "/rapid-claims/bulk-payments" },
      { label: "Bulk Receipts", path: "/rapid-claims/bulk-receipts" },
      {
        label: "Process Groups of Payments",
        path: "/rapid-claims/process-groups",
      },
      {
        label: "Release Repetitive Payments",
        path: "/rapid-claims/release-repetitive",
      },
      { label: "Review Held Reserves", path: "/rapid-claims/review-reserves" },
      {
        label: "Transfer/Void/Stop/Reissue Payments",
        path: "/rapid-claims/transfer-void",
      },
      { label: "Post Payments to Claims", path: "/rapid-claims/post-payments" },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    if (location.pathname.startsWith("/overview")) {
      return ["/overview"];
    }
    if (location.pathname.startsWith("/rapid-claims")) {
      return ["/rapid-claims"];
    }
    if (location.pathname.startsWith("/accounting")) {
      return ["/accounting"];
    }
    return [];
  });

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems(
      (prev) =>
        prev.includes(itemPath)
          ? prev.filter((path) => path !== itemPath)
          : [itemPath], // Only one submenu expanded at a time
    );
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === path || location.pathname + location.search === path
    );
  };

  const isMainPageActive = (item: SidebarItem) => {
    if (item.label === "Customer Center") {
      return (
        location.pathname.startsWith("/customer-center") ||
        location.pathname.startsWith("/overview")
      );
    }
    if (item.label === "Rapid Claims") {
      return location.pathname.startsWith("/rapid-claims");
    }
    if (item.path === "/" && item.label === "Home") {
      return location.pathname === "/";
    }
    return location.pathname === item.path;
  };

  // Helper to check if user is on a direct submenu item (with query params)
  const isSubmenuActive = (subItem: SubItem) => {
    return location.pathname + location.search === subItem.path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#F5F5F5] border border-gray-200 text-gray-700 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "h-screen bg-[#F5F5F5] border-r border-gray-200 text-gray-700 flex flex-col transition-all duration-300 z-40 shadow-sm fixed top-0 left-0 lg:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div
          className={cn(
            "h-[62px] px-4 border-b border-gray-200 flex items-center",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0054A6] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">OS</span>
              </div>
              <span className="text-[#0054A6] font-semibold text-lg font-header">
                OneShield
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-[#0054A6] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">OS</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="text-gray-500 hover:bg-gray-100 p-1 rounded transition-colors"
          >
            <ChevronLeft
              size={16}
              className={cn(
                "transition-transform",
                isCollapsed && "rotate-180",
              )}
            />
          </button>
        </div>

        <nav className="flex-1 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedItems.includes(item.path);
              const isMainActive = isMainPageActive(item);

              return (
                <li key={`${item.label}-${item.path}`}>
                  <RouterLink
                    to={item.path}
                    onClick={(e) => {
                      if (hasSubItems) {
                        e.preventDefault();
                        toggleExpanded(item.path);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between transition-colors w-full font-header rounded-md",
                      isCollapsed
                        ? "justify-center p-2"
                        : "gap-3 px-3.5 py-2.5",
                      // When a submenu is expanded: main menu light grey background, black text (regardless of selection)
                      hasSubItems && isExpanded
                        ? "bg-[#EEF1F6] text-[#2F3A45]"
                        : // Active main menu without subitems: dark grey background, white text
                          !hasSubItems && isMainActive && !location.search
                          ? "bg-[#6F7C88] text-white"
                          : // Inactive: transparent with grey text, light blue on hover
                            "bg-transparent text-[#6F7C88] hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={16}
                        className={cn(
                          "transition-colors",
                          // Light grey main menu with expanded submenu: black icon
                          hasSubItems && isExpanded
                            ? "text-[#2F3A45]"
                            : // Main menu without subs: white icon
                              !hasSubItems && isMainActive && !location.search
                              ? "text-white"
                              : "text-[#6F7C88]",
                        )}
                      />
                      {!isCollapsed && item.label}
                    </div>
                    {!isCollapsed && hasSubItems && (
                      <ChevronLeft
                        size={16}
                        className={cn(
                          "transition-transform flex-shrink-0",
                          isExpanded ? "rotate-90" : "-rotate-90",
                          // Light grey main menu with expanded submenu: black chevron
                          hasSubItems && isExpanded
                            ? "text-[#2F3A45]"
                            : // Main menu without subs: white chevron
                              !hasSubItems && isMainActive
                              ? "text-white"
                              : "text-[#6F7C88]",
                        )}
                      />
                    )}
                  </RouterLink>

                  {hasSubItems && isExpanded && (
                    <ul className="mt-1 space-y-1">
                      {item.subItems!.map((subItem) => {
                        const isSubActive = isSubmenuActive(subItem);
                        return (
                          <li key={subItem.path}>
                            <RouterLink
                              to={subItem.path}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block text-sm transition-colors rounded-md font-header",
                                isSubActive
                                  ? "bg-[#6F7C88] text-white px-3.5 py-2.5 pl-[22px]"
                                  : "bg-transparent text-[#6F7C88] px-3.5 py-2.5 pl-[22px] hover:bg-[#EEF1F6] hover:text-[#0054A6]",
                              )}
                            >
                              {subItem.label}
                            </RouterLink>
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

        <div className="p-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 OneShield Software
          </div>
        </div>
      </div>
    </>
  );
}
