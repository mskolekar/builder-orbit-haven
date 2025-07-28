import { useState } from 'react';
import { Bell, Settings, User, LogOut, ChevronDown, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from './button';
import { SearchBar } from './search-bar';
import { Badge } from './badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';

export function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Policy Renewal Due',
      message: 'Auto policy A9876 renewal due in 7 days',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Claim Update',
      message: 'Claim C1122 has been approved for processing',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Premium payment of $150 has been processed',
      time: '1 day ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-6 pl-16 lg:pl-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* OneShield Logo */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F86997fd4f89947089fcffe144da21f6c%2Fe34c506be8104429a2a08aef998ca011?format=webp&width=800"
            alt="OneShield"
            className="h-8 w-auto"
          />
          <div className="h-6 w-px bg-gray-300"></div>
          <h1 className="text-xl font-semibold text-gray-900">Customer Center</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <SearchBar />
        
        {/* Quick Actions - removed message button */}
        
        {/* Notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell size={18} />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-brand-red text-white rounded-full flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    notification.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Settings */}
        <Button variant="ghost" size="sm" className="p-2">
          <Settings size={18} />
        </Button>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  J
                </div>
                <span className="hidden lg:block text-sm font-medium">UW John</span>
                <ChevronDown size={14} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">UW John</p>
                <p className="text-sm text-gray-500">uw.john@vitily.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User size={16} className="mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={16} className="mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle size={16} className="mr-2" />
                Help & Support
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut size={16} className="mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
