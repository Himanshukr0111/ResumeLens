import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, disabled, id, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex items-start space-x-2.5">
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={cn(
              "peer h-4 w-4 shrink-0 rounded border border-border appearance-none bg-white transition-all cursor-pointer",
              "checked:bg-brand-500 checked:border-brand-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-subtle",
              className
            )}
            {...props}
          />
          <Check className="pointer-events-none absolute h-3 w-3 text-white stroke-[2.5] opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "text-sm font-medium text-foreground cursor-pointer select-none leading-none",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  "text-xs text-muted-foreground mt-1 select-none leading-normal",
                  disabled && "opacity-50"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
