import { useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import { Search, FileText, User, CreditCard, History as HistoryIcon } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'policy' | 'claim' | 'customer' | 'document';
  path: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Policy A9876',
    description: 'Auto Insurance Policy - Active',
    type: 'policy',
    path: '/policies/A9876'
  },
  {
    id: '2',
    title: 'Claim C1122',
    description: 'Auto Collision Claim - Pending',
    type: 'claim', 
    path: '/claims/C1122'
  },
  {
    id: '3',
    title: 'Rose K Profile',
    description: 'Customer Profile and Details',
    type: 'customer',
    path: '/profile'
  },
  {
    id: '4',
    title: 'Premium Payment Receipt',
    description: 'July 2025 Premium Payment',
    type: 'document',
    path: '/documents/receipt-july-2025'
  }
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'policy': return <CreditCard size={14} />;
      case 'claim': return <FileText size={14} />;
      case 'customer': return <User size={14} />;
      case 'document': return <HistoryIcon size={14} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        <Input
          placeholder="Search policies, claims, customers..."
          onClick={() => setOpen(true)}
          className="pl-10 w-64 lg:w-80 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          readOnly
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <kbd className="px-2 py-1 text-xs bg-white/20 text-white rounded border border-white/30">⌘K</kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search everything..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem>
              <FileText size={14} className="mr-2" />
              <span>Create New Policy</span>
            </CommandItem>
            <CommandItem>
              <User size={14} className="mr-2" />
              <span>Add New Customer</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Results">
            {mockSearchResults.map((result) => (
              <CommandItem key={result.id}>
                <div className="flex items-center mr-2">
                  {getIcon(result.type)}
                </div>
                <div>
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-gray-500">{result.description}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
