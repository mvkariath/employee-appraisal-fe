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
        <div className="flex flex-col bg-[#004A5E]">
          <Topbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 ">
            <div className="bg-gradient-to-b from-[#001A24] to-[#004A5E] text-white h-[90vh] overflow-y-auto p-6 space-y-8 rounded-lg border">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
