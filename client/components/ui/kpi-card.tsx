import { Card, CardContent } from './card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  className?: string;
}

export function KPICard({ title, value, change, icon: Icon, color = 'blue', className }: KPICardProps) {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
    green: 'from-green-50 to-green-100 border-green-200 text-green-600',
    orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-600',
    red: 'from-red-50 to-red-100 border-red-200 text-red-600',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600'
  };

  return (
    <Card className={cn(
      "bg-gradient-to-br border shadow-sm hover:shadow-md transition-shadow cursor-pointer",
      colorClasses[color],
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {value}
            </p>
            {change && (
              <div className={cn(
                "flex items-center text-xs mt-1",
                change.type === 'increase' ? 'text-green-600' : 'text-red-600'
              )}>
                <span>{change.type === 'increase' ? '↗' : '↘'}</span>
                <span className="ml-1">{change.value}%</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full", colorClasses[color])}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
