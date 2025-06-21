"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserNav } from "./user-nav";
import { ModeToggle } from "@/components/mode-toggle";

export function Topbar() {
  return (
    <header className="flex items-center gap-4 border-b border-white/10 bg-gradient-to-r from-[#001A24] via-[#002A35] to-[#004A5E] px-4 lg:h-[60px] lg:px-6 backdrop-blur-sm">
      {/* Mobile Sidebar Toggle (handled in Sidebar component) */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              type="search"
              placeholder="Search appraisals..."
              className="w-full appearance-none bg-white/10 backdrop-blur-sm border-white/20 pl-10 shadow-none md:w-2/3 lg:w-1/3 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-blue-400/50 transition-all duration-200 rounded-xl"
            />
          </div>
        </form>
      </div>
      {/* <ModeToggle /> */}
      <div className="flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
