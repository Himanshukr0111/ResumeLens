import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  BarChart3,
  Briefcase,
  History,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  activeItem?: string;
  onItemSelect?: (item: string) => void;
}

export function Sidebar({
  activeItem = "overview",
  onItemSelect,
  className,
  ...props
}: SidebarProps) {
  const sections = [
    {
      title: "Workspace",
      items: [
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "resumes", label: "My Resumes", icon: FolderOpen, count: "12" },
        { id: "matcher", label: "Job Matcher", icon: Sparkles, badge: "AI" },
        { id: "applications", label: "Applications", icon: Briefcase, count: "8" },
      ],
    },
    {
      title: "Analysis History",
      items: [
        { id: "scans", label: "Recent Scans", icon: History },
        { id: "templates", label: "ATS Templates", icon: FileText },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-border bg-white min-h-[calc(100vh-4rem)] p-4 select-none",
        className
      )}
      {...props}
    >
      <div className="flex-1 space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1.5">
            <h4 className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onItemSelect?.(item.id)}
                    type="button"
                    className={cn(
                      "flex items-center justify-between w-full px-2.5 py-2 text-sm font-medium rounded-md transition-all duration-150 group",
                      isActive
                        ? "bg-brand-50 text-brand-700 shadow-subtle font-semibold"
                        : "text-foreground/80 hover:bg-surface-subtle hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-brand-600"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.count && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {item.count}
                        </span>
                      )}
                      {item.badge && (
                        <Badge variant="brand" size="sm">
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <ChevronRight className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer Badge */}
      <div className="pt-4 mt-auto border-t border-border/60">
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-surface-subtle border border-border/80">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground font-medium">
            AI Engine v4.2 Active
          </span>
        </div>
      </div>
    </aside>
  );
}
