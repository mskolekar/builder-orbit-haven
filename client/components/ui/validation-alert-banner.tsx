import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationAlertBannerProps {
  message: string;
  fieldName?: string;
  onDismiss?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

export function ValidationAlertBanner({
  message,
  onDismiss,
  autoClose = false,
  autoCloseDuration = 5000,
}: ValidationAlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-red-600 text-white px-4 py-3 flex items-center gap-3 shadow-md">
      <AlertCircle size={20} className="flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 p-1 hover:bg-red-700 rounded transition-colors"
        title="Dismiss alert"
      >
        <X size={18} />
      </button>
    </div>
  );
}
