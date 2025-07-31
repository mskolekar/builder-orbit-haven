import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  User, 
  MessageCircle, 
  Users, 
  Link as LinkIcon, 
  CreditCard, 
  History
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
      { label: 'Personal Info', path: '/profile?section=personal-info' },
      { label: 'Professional and Legal Info', path: '/profile?section=professional-legal' },
      { label: 'Risk and Compliance', path: '/profile?section=risk-compliance' },
      { label: 'Other Details', path: '/profile?section=other-details' }
    ]
  },
  {
    icon: MessageCircle,
    label: 'Communication',
    path: '/communication',
    subItems: [
      { label: 'Contact Details', path: '/communication?tab=contact-details' },
      { label: 'Delivery Preferences', path: '/communication?tab=delivery-preferences' }
    ]
  },
  { icon: Users, label: 'Workgroup', path: '/workgroup' },
  { icon: LinkIcon, label: 'Relationships', path: '/relationships' },
  { icon: CreditCard, label: 'Credit Programs', path: '/credit-programs' },
  {
    icon: History,
    label: 'History',
    path: '/history',
    subItems: [
      { label: 'Work History', path: '/history?tab=work-history' }
    ]
  }
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
