import { useState } from 'react';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import { Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColumnFilterProps {
  options: string[];
  selectedValues: string[];
  onFilterChange: (values: string[]) => void;
  className?: string;
}

export function ColumnFilter({ options, selectedValues, onFilterChange, className }: ColumnFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      onFilterChange([]);
    } else {
      onFilterChange(options);
    }
  };

  const handleToggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onFilterChange(selectedValues.filter(v => v !== option));
    } else {
      onFilterChange([...selectedValues, option]);
    }
  };

  const isFiltered = selectedValues.length > 0 && selectedValues.length < options.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("h-6 w-6 p-0 hover:bg-gray-100", className)}
        >
          <Filter 
            size={12} 
            className={cn(
              "transition-colors",
              isFiltered ? "text-brand-blue" : "text-gray-400"
            )} 
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search size={14} className="absolute left-2 top-2.5 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>
        
        <div className="p-2">
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="select-all"
              checked={selectedValues.length === options.length}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-xs font-medium">
              Select All
            </label>
          </div>
          
          <div className="max-h-48 overflow-y-auto space-y-1">
            {filteredOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={() => handleToggleOption(option)}
                />
                <label htmlFor={option} className="text-xs truncate flex-1">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-2 border-t flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onFilterChange([])}
            className="flex-1 h-7 text-xs"
          >
            Clear
          </Button>
          <Button 
            size="sm" 
            onClick={() => setIsOpen(false)}
            className="flex-1 h-7 text-xs bg-brand-blue hover:bg-brand-blue/90"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
