import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  UserCheck,
  Phone,
  UserCog,
  Link as LinkIcon,
  CreditCard,
  Clock,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronRight,
  ChevronLeft
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
    icon: UserCheck,
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
    icon: Phone,
    label: 'Contact & Delivery',
    path: '/contact-delivery',
    subItems: [
      { label: 'Delivery Preference', path: '/contact-delivery?tab=delivery-preference' },
      { label: 'Contact', path: '/contact-delivery?tab=contact' }
    ]
  },
  {
    icon: Clock,
    label: 'Loss History',
    path: '/loss-history',
    subItems: [
      { label: 'Prior Policy', path: '/loss-history?tab=prior-policy' },
      { label: 'Prior Losses', path: '/loss-history?tab=prior-losses' }
    ]
  },
  { icon: LinkIcon, label: 'Relationships & Roles', path: '/relationships' },
  { icon: UserCog, label: 'Workgroups', path: '/workgroups' },
  { icon: CreditCard, label: 'Risk Mgt Credit Program', path: '/risk-management-credit' },
  { icon: BookOpen, label: 'Journals', path: '/journals' },
  { icon: Calculator, label: 'Financials', path: '/financials' }
];

interface CustomerCenterSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function CustomerCenterSidebar({ isCollapsed, onToggleCollapse }: CustomerCenterSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const getBreadcrumb = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    const tab = searchParams.get('tab');

    // Find the main menu item
    const mainItem = customerCenterItems.find(item => {
      if (item.path === '/') return path === '/';
      return path.startsWith(item.path);
    });

    if (!mainItem) return 'Overview';

    let breadcrumb = mainItem.label;

    // If there's a section or tab, find the sub-item
    if ((section || tab) && mainItem.subItems) {
      const subItem = mainItem.subItems.find(sub => {
        const subParams = new URLSearchParams(sub.path.split('?')[1] || '');
        return subParams.get('section') === section || subParams.get('tab') === tab;
      });
      if (subItem) {
        breadcrumb += ` > ${subItem.label}`;
      }
    }

    return breadcrumb;
  };

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
                    if (hasSubItems && !isCollapsed) {
                      e.preventDefault();
                      toggleExpanded(item.path);
                    } else {
                      // Navigate to the route if no sub-items or if collapsed
                      window.location.href = item.path;
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-lg text-sm transition-colors w-full",
                    isCollapsed ? "justify-center p-2" : "justify-between gap-3 px-3 py-2",
                    isMainActive && !location.search
                      ? "bg-[#0054A6] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  {isCollapsed ? (
                    <Icon size={16} />
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        {item.label}
                      </div>
                      {hasSubItems && (
                        isExpanded ?
                          <ChevronDown size={14} /> :
                          <ChevronRight size={14} />
                      )}
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
