"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PanelLeft, Home, FileText, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["HR", "DEVELOPER", "LEAD"],
  },
  {
    name: "My Appraisals",
    href: "/employee/appraisals",
    icon: FileText,
    roles: ["DEVELOPER"],
  },
];

function getRoleFromLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken)?.role : null;
  } catch (error) {
    console.error("Error parsing token", error);
    return null;
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const role = getRoleFromLocalStorage();
  const filteredNavItems = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <PanelLeft className="h-5 w-5 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="sm:max-w-xs bg-gradient-to-b from-[#001A24] via-[#002A35] to-[#004A5E] text-white flex flex-col p-0"
        >
          {/* This div will grow and push the logout section to the bottom */}
          <div className="flex-1">
            <div className="flex h-14 items-center border-b border-white/10 px-4 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-md flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-transparent">
                  AppraisalPro
                </span>
              </div>
            </div>
            <nav className="grid gap-1 mt-6 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/20 shadow-lg"
                      : "hover:bg-white/10 hover:backdrop-blur-sm"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      pathname === item.href
                        ? "text-blue-300"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`font-medium transition-colors ${
                      pathname === item.href
                        ? "text-white"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User info and logout section at the bottom */}
          <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-white/90">
                  Welcome back!
                </p>
                <p className="text-xs text-white/60 capitalize">
                  {role?.toLowerCase()}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-red-500/20 hover:border-red-400/30 border border-transparent transition-all duration-200 rounded-xl"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r md:block bg-gradient-to-b from-[#001A24] via-[#002A35] to-[#004A5E] text-white">
        <div className="flex h-full flex-col">
          {/* This div will grow and push the logout section to the bottom */}
          <div className="flex-1">
            <div className="flex h-14 items-center border-b border-white/10 px-4 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-md flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-transparent">
                  AppraisalPro
                </span>
              </div>
            </div>
            <nav className="px-2 py-4">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/20 shadow-lg"
                      : "hover:bg-white/10 hover:backdrop-blur-sm"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      pathname === item.href
                        ? "text-blue-300"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`font-medium transition-colors ${
                      pathname === item.href
                        ? "text-white"
                        : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User info and logout section at the bottom */}
          <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-white/90">
                  Welcome back!
                </p>
                <p className="text-xs text-white/60 capitalize">
                  {role?.toLowerCase()}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-3 text-white/80 hover:text-white hover:bg-red-500/20 hover:border-red-400/30 border border-transparent transition-all duration-200 rounded-xl"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
