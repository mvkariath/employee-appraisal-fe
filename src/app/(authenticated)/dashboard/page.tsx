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
  PlusSquareIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import AppraisalCycleModal from "@/components/hr/AppraisalCycleForm";

// import EmployeeForm from "@/components/EmployeeForm";
// import LeadEvaluation from "@/components/LeadEvaluation";
// import MeetingNotes from "@/components/MeetingNotes";
// import DevelopmentPlan from "@/components/DevelopmentPlan";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const router = useRouter();

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
      progress: 70,
    },
    {
      id: 3,
      name: "Mid-Year Review 2024",
      startDate: "2024-06-01",
      endDate: "2024-08-15",
      status: "Upcoming",
      employees: 89,
      completed: 0,
      progress: 5,
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

  const renderDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Appraisal Management
              </h1>
              <p className="text-lg text-gray-600">
                Streamline your performance review process
              </p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center"
            >
              <PlusIcon />
              Add Cycle
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Total Employees</p>
                    <p className="text-3xl font-bold">254</p>
                  </div>
                  <Users className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Completed Reviews</p>
                    <p className="text-3xl font-bold">23</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Pending Actions</p>
                    <p className="text-3xl font-bold">31</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appraisal Cycles */}
          <div className="grid grid-cols-1  gap-8 mb-8">
            <div className="grid ">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Appraisal Cycles
              </h2>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-2">
                {appraisalCycles.map((cycle) => (
                  <Card
                    key={cycle.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {cycle.name}
                          </CardTitle>
                          <CardDescription>
                            {cycle.startDate} - {cycle.endDate}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(cycle.status)}>
                          {cycle.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            {cycle.completed} of {cycle.employees} completed
                          </span>
                          <span>{cycle.progress}%</span>
                        </div>
                        <Progress
                          value={cycle.progress}
                          className={`h-2 
                          ${cycle.progress <= 20
                              ? "bg-red-200 [&>div]:bg-red-500"
                              : cycle.progress <= 40
                                ? "bg-orange-200 [&>div]:bg-orange-500"
                                : cycle.progress <= 60
                                  ? "bg-yellow-200 [&>div]:bg-yellow-500"
                                  : cycle.progress <= 80
                                    ? "bg-blue-200 [&>div]:bg-blue-500"
                                    : "bg-green-200 [&>div]:bg-green-500"
                            }`}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {cycle.status === "Active" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                router.push(`appraisal/${cycle.id}`);
                              }}
                            >
                              Manage
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Employee Progress */}
          </div>
        </div>
        <AppraisalCycleModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={() => console.log("Save Cycle")}
        />
      </div>
    );
  };

  const renderActiveView = () => {
    switch (activeView) {
      // case "employee-form":
      //   return (
      //     <EmployeeForm
      //       employee={selectedEmployee}
      //       onBack={() => setActiveView("dashboard")}
      //     />
      //   );
      // case "lead-evaluation":
      //   return (
      //     <LeadEvaluation
      //       employee={selectedEmployee}
      //       onBack={() => setActiveView("dashboard")}
      //     />
      //   );
      // case "meeting-notes":
      //   return (
      //     <MeetingNotes
      //       employee={selectedEmployee}
      //       onBack={() => setActiveView("dashboard")}
      //     />
      //   );
      // case "development-plan":
      //   return (
      //     <DevelopmentPlan
      //       employee={selectedEmployee}
      //       onBack={() => setActiveView("dashboard")}
      //     />
      //   );
      default:
        return renderDashboard();
    }
  };

  return renderDashboard();
};

export default Index;
