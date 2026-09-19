import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 shadow-sm focus:ring-blue-500",
      secondary:
        "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 focus:ring-slate-400",
      outline:
        "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm focus:ring-blue-500",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent focus:ring-slate-400",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white border border-rose-700 shadow-sm focus:ring-rose-500",
    };

    const sizeStyles = {
      sm: "px-2.5 py-1 text-xs font-medium rounded",
      md: "px-3.5 py-1.5 text-sm font-medium rounded-md",
      lg: "px-4 py-2 text-sm font-medium rounded-md",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
