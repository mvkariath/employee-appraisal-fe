import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowRight, FileText, User, Video } from "lucide-react";

// Helper functions can be co-located or imported from a shared file
const getGlassStatusStyles = (status: string) => {
  switch (status) {
    case "PENDING":
    case "SELF_APPRAISED":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
    case "FEEDBACK_SUBMITTED":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "COMPLETED":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

const getProgressFromStatus = (status: string): number => {
  switch (status) {
    case "PENDING":
      return 10;
    case "SELF_APPRAISED":
      return 50;
    case "FEEDBACK_SUBMITTED":
      return 75;
    case "COMPLETED":
      return 100;
    default:
      return 0;
  }
};

// Define types for strong typing and reusability
type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
};

interface EmployeeTableProps {
  employees: Employee[];
  onViewForm: (employee: Employee) => void;
  onPushToLead: (employee: Employee) => void;
  onConductMeeting: (employee: Employee) => void;
  // Add other handlers like onContact if needed
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onViewForm,
  onPushToLead,
  onConductMeeting,
}) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/5">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="hover:bg-white/5 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {employee.name}
                    </div>
                    <div className="text-sm text-white/70 capitalize">
                      {employee.role.toLowerCase()}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  className={cn(
                    "border font-medium capitalize",
                    getGlassStatusStyles(employee.status)
                  )}
                >
                  {employee.status.replace("_", " ").toLowerCase()}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Progress
                    value={getProgressFromStatus(employee.status)}
                    className="h-2 bg-white/10 flex-1"
                    indicatorClassName="bg-gradient-to-r from-blue-400 to-cyan-300"
                  />
                  <span className="text-sm text-white/70 w-8 text-right">
                    {getProgressFromStatus(employee.status)}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewForm(employee)}
                    className="text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                  {employee.status === "SELF_APPRAISED" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onPushToLead(employee)}
                      className="text-green-400 hover:bg-green-500/10 hover:text-green-300"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  {employee.status === "FEEDBACK_SUBMITTED" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onConductMeeting(employee)}
                      className="text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const EmployeeTableSkeleton: React.FC<{ rows?: number }> = ({
  rows = 5,
}) => (
  <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-white/10">
          {[...Array(5)].map((_, i) => (
            <th key={i} className="px-6 py-5">
              <Skeleton className="h-4 w-20 bg-white/10" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, i) => (
          <tr key={i} className="border-b border-white/10">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 bg-white/10" />
                  <Skeleton className="h-3 w-20 bg-white/10" />
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-4 w-24 bg-white/10" />
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-6 w-28 rounded-full bg-white/10" />
            </td>
            <td className="px-6 py-4">
              <Skeleton className="h-4 w-full bg-white/10" />
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
                <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
