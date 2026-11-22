import * as React from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  code?: string | number;
  onRetry?: () => void;
  actionText?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred while processing your request. Please try again.",
  code,
  onRetry,
  actionText = "Try again",
  className,
  ...props
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-destructive-border bg-destructive-muted/30 p-8 sm:p-12 text-center",
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive-muted border border-destructive-border shadow-subtle mb-4 text-destructive">
        <AlertOctagon className="h-6 w-6 stroke-[1.75]" />
      </div>

      <h3 className="text-base font-semibold text-foreground tracking-tight">
        {title}
      </h3>

      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
        {message}
      </p>

      {code && (
        <span className="mt-2 font-mono text-xs text-muted-foreground bg-white/60 px-2 py-0.5 rounded border border-border">
          Error code: {code}
        </span>
      )}

      {onRetry && (
        <div className="mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRetry}
            isLoading={isRetrying}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}
