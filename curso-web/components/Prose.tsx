import type { ReactNode } from "react";
import clsx from "clsx";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return <div className={clsx("prose prose-slate dark:prose-invert", className)}>{children}</div>;
}
