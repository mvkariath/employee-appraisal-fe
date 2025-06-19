"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft, Home, Users, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["HR", "DEVELOPER", "LEAD"],
  },
  // {
  //   name: "Employees",
  //   href: "/employees",
  //   icon: Users,
  //   roles: ["HR", "DEVELOPER"],
  // },
  {
    name: "My Appraisals",
    href: "/employee/appraisals",
    icon: FileText,
    roles: ["DEVELOPER"],
  },
  // {
  //   name: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  //   roles: ["HR", "DEVELOPER", "LEAD"],
  // },
  // { name: "Approvals", href: "/approvals", icon: Settings, roles: ["LEAD"] },
];

function getRoleFromLocalStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return null;
  }
  try {
    const userDetails = JSON.parse(storedToken);
    return userDetails?.role || null;
  } catch (error) {
    console.error("Failed to parse token from localStorage", error);
    return null;
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const role = getRoleFromLocalStorage();

  const filteredNavItems = navItems.filter((item) => {
    if (!role) return false;
    return item.roles.includes(role);
  });

  return (
    <>
      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 py-2 rounded-lg ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-lg">AppraisalPro</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
