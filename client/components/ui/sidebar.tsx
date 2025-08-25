import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

interface SubItem {
  label: string;
  path: string;
}

interface SidebarItem {
  label: string;
  path: string;
  subItems?: SubItem[];
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home', path: '/' },
  { label: 'New Submission', path: '/new-submission' },
  { label: 'Submissions', path: '/submissions' },
  { label: 'Policies', path: '/policies' },
  { label: 'Customer Center', path: '/' },
  { label: 'Accounting', path: '/accounting' },
  { label: 'Search Center', path: '/search' },
  { label: 'Other Utilities', path: '/utilities' },
  { label: 'Quick Links', path: '/links' },
  { label: 'Bulk Change Endorsements', path: '/bulk-changes' },
  { label: 'Manage Users', path: '/users' },
  { label: 'Analytic Reports', path: '/reports' }
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
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
    if (item.path === '/' && item.label === 'Customer Center') {
      return location.pathname === '/';
    }
    if (item.path === '/' && item.label === 'Home') {
      return false; // Don't highlight Home when on Customer Center
    }
    return location.pathname === item.path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-lg"
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
        "h-screen bg-white border-r border-gray-200 text-gray-700 flex flex-col transition-all duration-300 z-40 shadow-sm",
        "lg:translate-x-0 lg:static lg:z-auto",
        isCollapsed ? "w-16" : "w-64",
        isOpen ? "fixed translate-x-0" : "fixed -translate-x-full lg:translate-x-0"
      )}>
        <div className={cn("p-4 border-b border-gray-200 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0054A6] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">OS</span>
              </div>
              <span className="text-[#0054A6] font-semibold text-lg">OneShield</span>
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
            <ChevronLeft size={16} className={cn("transition-transform", isCollapsed && "rotate-180")} />
          </button>
        </div>
        
        <nav className="flex-1 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
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
                      "flex items-center rounded-lg text-sm transition-colors w-full",
                      isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2",
                      isMainActive && !location.search
                        ? "bg-[#0054A6] text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {isCollapsed ? (
                      <span className="text-xs font-medium">{item.label.charAt(0)}</span>
                    ) : (
                      item.label
                    )}
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

        <div className="p-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 OneShield Software
          </div>
        </div>
      </div>
    </>
  );
}
