"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        aria-hidden
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/60 dark:bg-slate-700/60"
      />
    );
  }

  const currentTheme = resolvedTheme ?? theme ?? "system";
  const isDark = currentTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-dark dark:hover:text-brand-dark"
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      aria-pressed={isDark}
    >
      <span aria-hidden className="text-sm font-semibold">
        {isDark ? "D" : "L"}
      </span>
    </button>
  );
}
