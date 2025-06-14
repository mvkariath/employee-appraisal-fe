import { redirect } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();

  //   if (!session) {
  //     redirect("/login");
  //   }

  return <MainLayout>{children}</MainLayout>;
}
