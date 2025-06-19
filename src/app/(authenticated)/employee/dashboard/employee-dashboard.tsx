"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Star, MessageCircle } from "lucide-react";
import { useGetEmployeeByIdQuery } from "@/api-service/employees/employee.api";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetPastAppraisalsQuery } from "@/api-service/appraisal/appraisal.api";
import { useGetAppraisalByEmployeeIdQuery } from "@/api-service/appraisal/appraisal.api";
// Dummy employee data
// const dummyEmployee = {
// 	employeeId: "EMP001",
// 	email: "jane.doe@example.com",
// 	name: "Jane Doe",
// 	age: 28,
// 	role: "hr",
// 	password: "securePassword123",
// 	experience: 5,
// 	status: "ACTIVE",
// 	dateOfJoining: new Date("2022-06-15"),
// };

// Dummy summary and feedback
const employeeSummary = {
  currentRating: "4.5",
  lastAppraisalDate: "2024-03-15",
  progress: 80,
};

const feedbackList = [
  {
    comment: "Great leadership and mentorship shown throughout the quarter.",
    givenBy: "Mike Chen",
    date: "2024-03-20",
  },
  {
    comment: "Excellent planning and execution of the Q1 roadmap.",
    givenBy: "Lisa Park",
    date: "2024-02-10",
  },
];

const EmpDashboardPage = () => {
  let token: any | null = null;
  if (typeof window !== "undefined") {
    const tokenStr = localStorage.getItem("token");
    if (tokenStr) {
      try {
        token = JSON.parse(tokenStr);
        console.log("Parsed token:", token);
      } catch {
        token = null;
        console.log("Token is not valid JSON:", tokenStr);
      }
    }
  }

  if (!token) {
    return <div className="p-8 text-center">Loading employee info...</div>;
  }
  const employeeId = token?.id;
  console.log("Employee ID:", employeeId);
  const {
    data: employee,
    isLoading: loadingEmployee,
    error: errorEmployee,
  } = useGetEmployeeByIdQuery(
    employeeId ? { id: Number(employeeId) } : skipToken
  );
  const {
    data: allAppraisals = [],
    isLoading: loadingAllAppraisals,
    error: errorAllAppraisals,
  } = useGetAppraisalByEmployeeIdQuery(employeeId ? employeeId : skipToken);
  console.log("All appraisals:", allAppraisals);
  const {
    data: pastAppraisals = [],
    isLoading: loadingAppraisals,
    error: errorAppraisals,
  } = useGetPastAppraisalsQuery(employeeId ? employeeId : skipToken);
  console.log("Past appraisal:", pastAppraisals);
  const allRatings = pastAppraisals
    .flatMap((appraisal: any) =>
      (appraisal.performance_factors || []).map((pf: any) => pf.rating)
    )
    .filter((rating: any) => typeof rating === "number" && !isNaN(rating));

  const currentRating =
    allRatings.length > 0
      ? (
          allRatings.reduce((sum: number, r: number) => sum + r, 0) /
          allRatings.length
        ).toFixed(2)
      : "-";

  //   const lastAppraisal = [...pastAppraisals]
  //     .filter((a: any) => a.submitted_at)
  //     .sort(
  //       (a: any, b: any) =>
  //         new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  //     )[0];

  //   const lastAppraisalDate = lastAppraisal
  //     ? new Date(lastAppraisal.closed_at).toLocaleDateString()
  //     : "-";
  
console.log("All appraisals:", allAppraisals);
  // Find the most recent appraisal (ongoing or completed)
  const mostRecentAppraisal = allAppraisals.length
    ? [...allAppraisals]
        .filter((a: any) => a.submitted_at)
        .sort(
          (a: any, b: any) =>
            new Date(b.submitted_at).getTime() -
            new Date(a.submitted_at).getTime()
        )[0]
    : undefined;
	  console.log("Most recent appraisal:", mostRecentAppraisal);
  const currentAppraisal = pastAppraisals.find(
    (a: any) => a.current_status !== "ALL_DONE"
  );
  const lastCompletedAppraisal = [...pastAppraisals]
    .filter((a: any) => a.current_status === "ALL_DONE" && a.submitted_at)
    .sort(
      (a: any, b: any) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
    )[0];
  console.log("Current appraisal:", currentAppraisal);
  const currentAppraisalStatus = currentAppraisal
    ? currentAppraisal.current_status || currentAppraisal.current_status
    : "-";

  const lastAppraisalDate = lastCompletedAppraisal
    ? new Date(lastCompletedAppraisal.closed_at).toLocaleDateString()
    : "-";
  console.log("Last completed appraisal:", lastCompletedAppraisal);
//   const mostRecentAppraisal = [...pastAppraisals]
//     .filter((a: any) => a.submitted_at)
//     .sort(
//       (a: any, b: any) =>
//         new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
//     )[0];
  const ongoingAppraisal = [...pastAppraisals]
    .filter((a: any) => a.current_status !== "ALL_DONE" && a.submitted_at)
    .sort(
      (a: any, b: any) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
    )[0];

  console.log("Most recent appraisal:", mostRecentAppraisal);
  if (loadingEmployee) {
    return <div className="p-8 text-center">Loading employee data...</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {employee?.name}
          </h1>
          <p className="text-lg text-gray-600">
            Here's your latest appraisal summary and feedback.
          </p>
        </div>

        {/* Rating, Appraisal Date, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Current Rating</p>
                  <p className="text-3xl font-bold">{currentRating || "N/A"}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Last Appraisal</p>
                  <p className="text-3xl font-bold">
                    {lastAppraisalDate || "N/A"}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Status</p>
                  <p className="text-3xl font-bold">
                    {mostRecentAppraisal?.current_status || "NA"}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary and Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle> Employee Details</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Employee ID:</span>{" "}
                  {employee?.employeeId}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {employee?.email}
                </div>
                <div>
                  <span className="font-semibold">Role:</span> {employee?.role}
                </div>
                <div>
                  <span className="font-semibold">Experience:</span>{" "}
                  {employee?.experience} years
                </div>
                <div>
                  <span className="font-semibold">Date of Joining:</span>{" "}
                  {employee?.dateOfJoining
                    ? new Date(employee.dateOfJoining).toLocaleDateString()
                    : ""}
                </div>
                {/* <div>
                  <span className="font-semibold">Progress:</span>
                  <Progress
                    value={employeeSummary.progress}
                    className="h-2 mt-1"
                  />
                </div> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>
                Feedback from your leads and peers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pastAppraisals.length > 0 ? (
                <ul className="space-y-2">
                  {pastAppraisals
                    .slice(0, 3)
                    .map((appraisal: any, idx: number) => (
                      <li key={idx} className="bg-gray-100 rounded p-3">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-700">
                            {lastCompletedAppraisal?.content ||
                              "No feedback provided"}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Period: {appraisal.cycle?.name || "N/A"}
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <div>No recent feedback.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboardPage;
