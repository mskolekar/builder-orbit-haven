import { Bell, Settings, LogOut } from 'lucide-react';
import { Button } from './button';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold text-gray-900">Customer Center</h1>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell size={18} />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Settings size={18} />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <LogOut size={18} />
        </Button>
        <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
          Log Out
        </Button>
      </div>
    </header>
  );
}
