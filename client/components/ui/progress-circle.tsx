import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'orange' | 'red';
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function ProgressCircle({ 
  value, 
  max, 
  size = 'md', 
  color = 'blue', 
  showValue = true,
  label,
  className 
}: ProgressCircleProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20', 
    lg: 'w-24 h-24'
  };
  
  const colorClasses = {
    blue: 'text-brand-blue',
    green: 'text-brand-green',
    orange: 'text-brand-orange',
    red: 'text-brand-red'
  };
  
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const radius = size === 'sm' ? 28 : size === 'md' ? 34 : 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-1000 ease-out", colorClasses[color])}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("font-semibold", 
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            )}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      {label && (
        <span className="text-xs text-medium-gray mt-1 text-center">{label}</span>
      )}
    </div>
  );
}
