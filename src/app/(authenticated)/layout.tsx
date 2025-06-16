'use client'
import { redirect } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import { Provider } from "react-redux";
import { store } from "@/api-service/store";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();

  //   if (!session) {
  //     redirect("/login");
  //   }

  return <Provider store={store}><MainLayout>{children}</MainLayout>;</Provider>
}
