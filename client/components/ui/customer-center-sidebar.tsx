import { Link, useLocation } from 'react-router-dom';
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
  DollarSign
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
  { icon: CreditCard, label: 'Risk Management Credit Program', path: '/risk-management-credit' },
  {
    icon: MessageCircle,
    label: 'Contact & Delivery',
    path: '/contact-delivery',
    subItems: [
      { label: 'Delivery Preference', path: '/contact-delivery?tab=delivery-preference' },
      { label: 'Contact', path: '/contact-delivery?tab=contact' }
    ]
  },
  { icon: History, label: 'Journals', path: '/journals' },
  { icon: BarChart3, label: 'Financials', path: '/financials' }
];

export function CustomerCenterSidebar() {
  const location = useLocation();

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
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Customer Center</h2>
        <p className="text-sm text-gray-600 mt-1">Rose K - Lawyer</p>
      </div>
      
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {customerCenterItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMainActive = isMainPageActive(item);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full",
                    isMainActive && !location.search
                      ? "bg-[#0054A6] text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
                
                {hasSubItems && (
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
