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
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const appraisalCycles = [
    {
      id: 1,
      name: "Q1 2024 Performance Review",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      status: "Active",
      employees: 45,
      completed: 23,
      progress: 51,
    },
    {
      id: 2,
      name: "Annual Review 2024",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      status: "Planning",
      employees: 120,
      completed: 0,
      progress: 0,
    },
    {
      id: 3,
      name: "Mid-Year Review 2024",
      startDate: "2024-06-01",
      endDate: "2024-08-15",
      status: "Upcoming",
      employees: 89,
      completed: 0,
      progress: 0,
    },
  ];

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

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Appraisal Cycles */}
        <div className="grid grid-cols-1  gap-8 mb-8">
          {/* Employee Progress */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Employee Progress
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {employees.map((employee) => (
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
                        <span className="text-gray-600">
                          Current Stage: {employee.stage}
                        </span>
                        <span className="text-gray-600">
                          {employee.progress}%
                        </span>
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
          </div>
        </div>

        {/* Quick Actions */}
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      //   case "employee-form":
      //     return (
      //       <EmployeeForm
      //         employee={selectedEmployee}
      //         onBack={() => setActiveView("dashboard")}
      //       />
      //     );
      //   case "lead-evaluation":
      //     return (
      //       <LeadEvaluation
      //         employee={selectedEmployee}
      //         onBack={() => setActiveView("dashboard")}
      //       />
      //     );
      //   case "meeting-notes":
      //     return (
      //       <MeetingNotes
      //         employee={selectedEmployee}
      //         onBack={() => setActiveView("dashboard")}
      //       />
      //     );
      //   case "development-plan":
      //     return (
      //       <DevelopmentPlan
      //         employee={selectedEmployee}
      //         onBack={() => setActiveView("dashboard")}
      //       />
      //     );
      default:
        return renderDashboard();
    }
  };

  return renderActiveView();
};

export default Index;
