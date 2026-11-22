import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  currentPath?: string;
}

export function Navbar({ currentPath = "/" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Resumes", href: "#resumes" },
    { label: "AI Matcher", href: "#matcher", badge: "AI" },
    { label: "Job Tracker", href: "#jobs" },
    { label: "Analytics", href: "#analytics" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-brand transition-transform duration-200 group-hover:scale-105">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-foreground text-base leading-none flex items-center gap-1.5">
                Resume<span className="text-brand-600 font-bold">Lens</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-foreground bg-surface-subtle"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle/70"
                  )}
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded-full bg-brand-50 text-brand-700 border border-brand-200/80 px-1.5 py-0.2 text-[10px] font-semibold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Command Palette, Notifications, User Menu */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Quick Search Shortcut */}
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground border border-border bg-white rounded-md shadow-subtle hover:bg-surface-subtle transition-colors"
            title="Quick search (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Search resumes...</span>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-surface-subtle px-1 text-[10px] font-mono text-muted-foreground">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-500" />
          </Button>

          {/* New Resume CTA */}
          <Button variant="primary" size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
            New Analysis
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-brand-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <Avatar fallback="RL" size="sm" />
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-foreground">
                    Alex Mercer
                  </p>
                  <p className="text-xs leading-none text-muted-foreground font-mono">
                    alex@resumelens.ai
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-white p-4 space-y-3 animate-fade-in shadow-dropdown">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-surface-subtle"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded-full bg-brand-50 text-brand-700 border border-brand-200 px-1.5 py-0.2 text-[10px] font-semibold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Button variant="primary" size="sm" className="w-full">
              New Analysis
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
