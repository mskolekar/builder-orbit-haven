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
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

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

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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

  const isMainPageActive = (item: SidebarItem) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === item.path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#3B82F6] text-white rounded-lg shadow-lg"
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
      <div className={cn(
        "w-64 h-screen bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white flex flex-col transition-transform duration-300 z-40",
        "lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "fixed translate-x-0" : "fixed -translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4">
          {/* Removed Customer Center title */}
        </div>
        
        <nav className="flex-1 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedItems.includes(item.path);
              const isMainActive = isMainPageActive(item);
              
              return (
                <li key={item.path}>
                  <Link
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
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full",
                      isMainActive && !location.search
                        ? "bg-white/20 text-white" 
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                  
                  {hasSubItems && isExpanded && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.subItems!.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block px-3 py-1.5 text-xs rounded transition-colors border-l-2 border-white/20 pl-4",
                              isActive(subItem.path)
                                ? "bg-white/15 text-white border-white/40" 
                                : "text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
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

        <div className="p-3 border-t border-white/10">
          <div className="text-xs text-white/60 text-center">
            Made with ❤️ Vitily
          </div>
        </div>
      </div>
    </>
  );
}
