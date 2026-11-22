import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white shadow-subtle hover:bg-brand-600 hover:shadow-brand active:bg-brand-700",
        secondary:
          "bg-white text-foreground border border-border shadow-subtle hover:bg-surface-subtle hover:border-border hover:text-foreground active:bg-surface-muted",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface-subtle hover:text-foreground active:bg-surface-muted",
        ghost:
          "text-foreground hover:bg-surface-subtle hover:text-foreground active:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-subtle hover:bg-destructive-hover active:opacity-90",
        success:
          "bg-success text-success-foreground shadow-subtle hover:bg-emerald-700 active:opacity-90",
        link:
          "text-brand-600 underline-offset-4 hover:underline p-0 h-auto font-medium active:scale-100",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
        md: "h-9 px-4 text-sm gap-2 rounded-md",
        lg: "h-11 px-5 text-base gap-2.5 rounded-lg",
        icon: "h-9 w-9 p-0 rounded-md",
        "icon-sm": "h-8 w-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
