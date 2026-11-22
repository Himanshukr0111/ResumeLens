import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  id?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked = false,
      onCheckedChange,
      disabled = false,
      label,
      description,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    return (
      <div className="flex items-center justify-between space-x-3">
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={switchId}
                className={cn(
                  "text-sm font-medium text-foreground cursor-pointer select-none",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  "text-xs text-muted-foreground select-none",
                  disabled && "opacity-50"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        <button
          type="button"
          role="switch"
          id={switchId}
          aria-checked={checked}
          disabled={disabled}
          ref={ref}
          onClick={() => !disabled && onCheckedChange?.(!checked)}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-brand-500" : "bg-border",
            className
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-subtle ring-0 transition duration-200 ease-in-out",
              checked ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
