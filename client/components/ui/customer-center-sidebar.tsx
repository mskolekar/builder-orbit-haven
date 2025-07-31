import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  User,
  MessageCircle,
  Users,
  Link as LinkIcon,
  CreditCard,
  History,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SubItem {
  label: string;
  path: string;
}

interface CustomerCenterSidebarItem {
  icon: any;
  label: string;
  path: string;
  subItems?: SubItem[];
}

const customerCenterItems: CustomerCenterSidebarItem[] = [
  { icon: BarChart3, label: 'Overview', path: '/' },
  {
    icon: User,
    label: 'Profile',
    path: '/profile',
    subItems: [
      { label: 'Person Info', path: '/profile?section=person-info' },
      { label: 'Addresses', path: '/profile?section=addresses' },
      { label: 'Additional Info', path: '/profile?section=additional-info' },
      { label: 'Person History', path: '/profile?section=person-history' }
    ]
  },
  {
    icon: MessageCircle,
    label: 'Contact & Delivery',
    path: '/contact-delivery',
    subItems: [
      { label: 'Delivery Preference', path: '/contact-delivery?tab=delivery-preference' },
      { label: 'Contact', path: '/contact-delivery?tab=contact' }
    ]
  },
  {
    icon: History,
    label: 'Loss History',
    path: '/loss-history',
    subItems: [
      { label: 'Prior Policy', path: '/loss-history?tab=prior-policy' },
      { label: 'Prior Losses', path: '/loss-history?tab=prior-losses' }
    ]
  },
  { icon: LinkIcon, label: 'Relationships & Roles', path: '/relationships' },
  { icon: Users, label: 'Workgroups', path: '/workgroups' },
  { icon: CreditCard, label: 'Risk Mgt Credit Program', path: '/risk-management-credit' },
  { icon: FileText, label: 'Journals', path: '/journals' },
  { icon: DollarSign, label: 'Financials', path: '/financials' }
];

interface CustomerCenterSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function CustomerCenterSidebar({ isCollapsed, onToggleCollapse }: CustomerCenterSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems(prev =>
      prev.includes(itemPath)
        ? prev.filter(path => path !== itemPath)
        : [...prev, itemPath]
    );
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname + location.search === path;
  };

  const isMainPageActive = (item: CustomerCenterSidebarItem) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === item.path;
  };

  return (
    <div className={cn("h-full bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn("border-b border-gray-200 py-3 flex items-center",
        isCollapsed ? "px-2 justify-center" : "px-4 justify-between"
      )}>
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Customer Center</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              <span>Customer Center</span>
              <span>&gt;</span>
              <span className="text-gray-700 font-medium">Overview</span>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="text-gray-500 hover:bg-gray-100 p-1 rounded transition-colors"
          title={isCollapsed ? "Expand Customer Center" : "Collapse Customer Center"}
        >
          <ChevronLeft size={16} className={cn("transition-transform", !isCollapsed && "rotate-180")} />
        </button>
      </div>
      
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {customerCenterItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMainActive = isMainPageActive(item);
            const isExpanded = expandedItems.includes(item.path);

            return (
              <li key={item.path}>
                <button
                  onClick={(e) => {
                    if (hasSubItems) {
                      e.preventDefault();
                      toggleExpanded(item.path);
                    } else {
                      // Navigate to the route if no sub-items
                      window.location.href = item.path;
                    }
                  }}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full",
                    isMainActive && !location.search
                      ? "bg-[#0054A6] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    {item.label}
                  </div>
                  {hasSubItems && (
                    isExpanded ?
                      <ChevronDown size={14} /> :
                      <ChevronRight size={14} />
                  )}
                </button>

                {hasSubItems && isExpanded && !isCollapsed && (
                  <ul className="mt-1 ml-6 space-y-1">
                    {item.subItems!.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className={cn(
                            "block px-3 py-1.5 text-xs rounded transition-colors border-l-2 border-gray-200 pl-4",
                            isActive(subItem.path)
                              ? "bg-blue-50 text-[#0054A6] border-[#0054A6]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
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
