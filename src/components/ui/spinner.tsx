import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "neutral" | "white";
}

export function Spinner({
  size = "md",
  variant = "brand",
  className,
  ...props
}: SpinnerProps) {
  const sizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  };

  const variantMap = {
    brand: "text-brand-500",
    neutral: "text-muted-foreground",
    white: "text-white",
  };

  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <Loader2
        className={cn("animate-spin", sizeMap[size], variantMap[variant])}
      />
      <span className="sr-only">Loading...</span>
    </span>
  );
}
