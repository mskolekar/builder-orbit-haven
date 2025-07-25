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

const sidebarItems = [
  { icon: BarChart3, label: 'Overview', path: '/' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: MessageCircle, label: 'Communication', path: '/communication' },
  { icon: Users, label: 'Workgroup', path: '/workgroup' },
  { icon: LinkIcon, label: 'Relationships', path: '/relationships' },
  { icon: CreditCard, label: 'Credit Programs', path: '/credit-programs' },
  { icon: History, label: 'History', path: '/history' },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-purple text-white rounded-lg shadow-lg"
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
        "w-64 h-screen bg-gradient-to-b from-brand-purple to-brand-blue text-white flex flex-col transition-transform duration-300 z-40",
        "lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "fixed translate-x-0" : "fixed -translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <h1 className="text-xl font-semibold">Customer Center</h1>
        </div>
        
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
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
