import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /**
   * The Lucide icon component to display.
   * @example icon={PackageOpen}
   */
  icon: LucideIcon;
  /**
   * The main title text for the empty state.
   */
  title: string;
  /**
   * A more detailed description or explanation.
   */
  description?: string;
  /**
   * An optional action button or link to guide the user.
   * @example action={<Button>Create New</Button>}
   */
  action?: React.ReactNode;
  /**
   * Optional additional class names for the container.
   */
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12",
        "bg-black/20 backdrop-blur-sm border-2 border-dashed border-white/10 rounded-2xl",
        className
      )}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 mb-6">
        <Icon className="h-8 w-8 text-white/40" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="max-w-sm text-white/60 mb-6">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
