"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { LeadEvaluationForm } from "@/components/leads/LeadEvaluationForm";
import EmpDashboardPage from "../employee/dashboard/employee-dashboard";
import LeadsDashboardPage from "../leads/dashboard/lead-dashboard";
import HrDashboardPage from "../hr/dashboard/hr-dashboard";

const DashboardLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <p className="text-lg">Loading Dashboard...</p>
  </div>
);

const DashboardPage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.replace("/login");
      return;
    }

    try {
      const userDetails = JSON.parse(storedToken);
      if (userDetails?.role) {
        setUserRole(userDetails.role);
      } else {
        console.error("No role found in user details");
        router.replace("/login");
      }
    } catch (error) {
      console.error("Failed to parse token from localStorage", error);
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  switch (userRole) {
    case "DEVELOPER":
      return <EmpDashboardPage />;
    case "HR":
      return <HrDashboardPage />;
    case "LEAD":
      return <LeadsDashboardPage />;
    default:
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-red-500">
            Unauthorized: Your role is not permitted to view this page.
          </p>
        </div>
      );
  }
};

export default DashboardPage;
