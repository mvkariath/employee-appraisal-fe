"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { FileText, Grid, User } from "lucide-react";
import EmployeeForm from "../../../appraisal/[id]/components/EmployeeForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Employee } from "@/types";
import { useParams } from "next/navigation";
import { useGetAppraisalsByCycleIdQuery } from "@/api-service/appraisal/appraisal.api";

const Index = () => {
  const [displayMode, setDisplayMode] = useState<"card" | "table">("card");
  const [isViewForm, setIsViewForm] = useState(false);
  const [currentIdpEmployee, setCurrentIdpEmployee] = useState<
    Employee & { appraisalId: string }
  >();
  const [employees, setEmployees] = useState<
    (Employee & { appraisalId: string })[]
  >([]);

  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useGetAppraisalsByCycleIdQuery(id);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEmployees(data);
    }
  }, [data]);

  const getProgressFromStatus = (status: string): number => {
    const statusMap: Record<string, number> = {
      NA: 0,
      INITIATED: 10,
      SELF_APPRAISED: 25,
      INITIATE_FEEDBACK: 40,
      FEEDBACK_SUBMITTED: 60,
      MEETING_DONE: 75,
      DONE: 90,
      ALL_DONE: 100,
    };
    return statusMap[status] || 0;
  };

  const getStatusColor = (status: string) => {
    const statusColorMap: Record<string, string> = {
      NA: "bg-red-100 text-red-800",
      INITIATED: "bg-red-100 text-red-800",
      SELF_APPRAISED: "bg-blue-100 text-blue-800",
      INITIATE_FEEDBACK: "bg-gray-100 text-gray-800",
      FEEDBACK_SUBMITTED: "bg-blue-100 text-blue-800",
      MEETING_DONE: "bg-yellow-100 text-yellow-800",
      DONE: "bg-purple-100 text-purple-800",
      ALL_DONE: "bg-green-100 text-green-800",
    };
    return statusColorMap[status] || "bg-gray-100 text-gray-800";
  };

  const renderCardSkeleton = () => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-2 w-full" />
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTableSkeleton = () => (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Employee", "Department", "Status", "Progress", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-6 w-24" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 w-32" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? [...Array(6)].map((_, i) => <div key={i}>{renderCardSkeleton()}</div>)
        : employees.map((employee) => (
            <Card
              key={employee.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {employee.role} • {employee.department}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Status:</span>
                    <span>{getProgressFromStatus(employee.status)}%</span>
                  </div>
                  <Progress
                    value={getProgressFromStatus(employee.status)}
                    className="h-2"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsViewForm(true);
                        setCurrentIdpEmployee(employee);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View Form
                    </Button>
                    <Button size="sm" variant="outline">
                      <User className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );

  const renderTableView = () =>
    isLoading ? (
      renderTableSkeleton()
    ) : (
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Employee", "Department", "Status", "Progress", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-6 py-4 whitespace-nowrap">{emp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {emp.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={getStatusColor(emp.status)}>
                    {emp.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Progress
                    value={getProgressFromStatus(emp.status)}
                    className="h-2"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsViewForm(true);
                      setCurrentIdpEmployee(emp);
                    }}
                  >
                    View Form
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <Card className="border border-gray-200 bg-gray-100 h-[90vh] overflow-y-auto rounded-md dark:bg-gray-800">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-4xl font-semibold text-gray-900">
              Employee Progress
            </CardTitle>
            <CardDescription className="text-lg">
              Track and manage employee appraisal progress
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={displayMode === "card" ? "default" : "outline"}
              size="sm"
              onClick={() => setDisplayMode("card")}
            >
              <Grid className="h-4 w-4 mr-2" />
              Card View
            </Button>
            <Button
              variant={displayMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setDisplayMode("table")}
            >
              <Table className="h-4 w-4 mr-2" />
              Table View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="container mx-auto px-6 py-8">
        {displayMode === "card" ? renderCardView() : renderTableView()}
      </CardContent>

      {currentIdpEmployee && (
        <EmployeeForm
          open={isViewForm}
          onOpenChange={setIsViewForm}
          appraisal={currentIdpEmployee}
        />
      )}
    </Card>
  );
};

export default Index;
