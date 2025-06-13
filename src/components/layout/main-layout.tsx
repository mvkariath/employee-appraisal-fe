"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { ThemeProvider } from "next-themes";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
        <Sidebar />
        <div className="flex flex-col">
          <Topbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 ">
            <div className="border rounded-md border-dotted">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
