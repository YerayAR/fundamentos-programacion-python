"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { ServiceWorkerRegister } from "./ServiceWorkerRegister";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ServiceWorkerRegister />
    </ThemeProvider>
  );
}
