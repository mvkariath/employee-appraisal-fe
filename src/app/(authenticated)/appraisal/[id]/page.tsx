"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Users,
  FileText,
  Target,
  Clock,
  CheckCircle2,
  User,
  Building2,
  Table,
  Grid,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayMode, setDisplayMode] = useState<"card" | "table">("card");

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      department: "Engineering",
      role: "Senior Developer",
      cycle: "Q1 2024 Performance Review",
      status: "Self-Assessment Complete",
      stage: "Lead Review",
      progress: 60,
      lead: "Mike Chen",
    },
    {
      id: 2,
      name: "David Rodriguez",
      department: "Marketing",
      role: "Marketing Specialist",
      cycle: "Q1 2024 Performance Review",
      status: "Pending Self-Assessment",
      stage: "Employee Form",
      progress: 20,
      lead: "Lisa Park",
    },
    {
      id: 3,
      name: "Emily Chen",
      department: "Design",
      role: "UX Designer",
      cycle: "Q1 2024 Performance Review",
      status: "Meeting Scheduled",
      stage: "Final Review",
      progress: 80,
      lead: "John Smith",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-blue-100 text-blue-800";
      case "Upcoming":
        return "bg-gray-100 text-gray-800";
      case "Self-Assessment Complete":
        return "bg-blue-100 text-blue-800";
      case "Pending Self-Assessment":
        return "bg-yellow-100 text-yellow-800";
      case "Meeting Scheduled":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-lg transition-shadow">
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
                <span className="text-gray-600">
                  Current Stage: {employee.stage}
                </span>
                <span className="text-gray-600">{employee.progress}%</span>
              </div>
              <Progress value={employee.progress} className="h-2" />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setActiveView("employee-form");
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

  const renderTableView = () => (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {employee.name}
                    </div>
                    <div className="text-sm text-gray-500">{employee.role}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Progress value={employee.progress} className="h-2 w-32" />
                  <span className="text-sm text-gray-500">
                    {employee.progress}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setActiveView("employee-form");
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost">
                    <User className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Employee Progress
          </h2>
          <div className="flex gap-2 ">
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

        {displayMode === "card" ? renderCardView() : renderTableView()}
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      default:
        return renderDashboard();
    }
  };

  return renderActiveView();
};

export default Index;
