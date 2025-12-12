import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface HorizontalFormFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  labelWidth?: "sm" | "md" | "lg";
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const labelWidthClasses = {
  sm: "w-32",
  md: "w-40",
  lg: "w-48",
};

export const HorizontalFormField = React.forwardRef<
  HTMLDivElement,
  HorizontalFormFieldProps
>(
  (
    {
      label,
      labelWidth = "md",
      required = false,
      error,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-start gap-4", className)}
        {...props}
      >
        <div
          className={cn("flex-shrink-0 pt-2", labelWidthClasses[labelWidth])}
        >
          <Label
            className={cn(
              "text-sm font-medium text-gray-700",
              required && "after:content-['_*'] after:text-destructive",
            )}
          >
            {label}
          </Label>
        </div>
        <div className="flex-1">
          {children}
          {error && (
            <p className="text-sm font-medium text-destructive mt-1">{error}</p>
          )}
        </div>
      </div>
    );
  },
);

HorizontalFormField.displayName = "HorizontalFormField";
