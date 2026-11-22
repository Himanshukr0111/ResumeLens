import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[90px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground shadow-subtle transition-all duration-150 placeholder:text-muted-foreground/70 leading-relaxed resize-y",
          "focus-visible:outline-none focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/10",
          "disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60",
          error &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10 text-destructive placeholder:text-destructive/50",
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
