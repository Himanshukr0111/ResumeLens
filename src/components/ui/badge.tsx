import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        brand:
          "bg-brand-50 text-brand-700 border border-brand-200/80",
        neutral:
          "bg-secondary text-muted-foreground border border-border",
        success:
          "bg-success-muted text-success border border-success-border",
        warning:
          "bg-warning-muted text-warning border border-warning-border",
        destructive:
          "bg-destructive-muted text-destructive border border-destructive-border",
        outline:
          "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "px-2 py-0.2 text-[10px] tracking-wide",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "brand" && "bg-brand-500",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "destructive" && "bg-destructive",
            variant === "neutral" && "bg-muted-foreground",
            variant === "outline" && "bg-foreground"
          )}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
