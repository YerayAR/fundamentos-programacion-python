import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand/10 px-2 py-1 text-xs font-medium text-brand dark:bg-brand-dark/20 dark:text-brand-dark">
      {children}
    </span>
  );
}
