import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-border bg-white px-3 py-1 text-sm text-foreground shadow-subtle transition-all duration-150 placeholder:text-muted-foreground/70",
            "focus-visible:outline-none focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/10",
            "disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60",
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10 text-destructive placeholder:text-destructive/50",
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
