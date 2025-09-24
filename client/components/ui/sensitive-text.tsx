import * as React from "react";
import { cn } from "@/lib/utils";

export interface SensitiveTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
  masked?: string;
}

export function SensitiveText({ value, masked = "••••••••", className, ...props }: SensitiveTextProps) {
  return (
    <span className={cn("relative inline-block group cursor-help align-baseline", className)} {...props}>
      <span className="opacity-100 group-hover:opacity-0 group-focus-within:opacity-0 select-none">
        {masked}
      </span>
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">{value}</span>
    </span>
  );
}
export default SensitiveText;
