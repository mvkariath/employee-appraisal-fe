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
  ArrowRight,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Competency } from "@/components/hr/PerformanceFactorTable";
import EmployeeForm from "./components/EmployeeForm";
import { useGetAppraisalsByCycleIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useParams } from "next/navigation";
import { Employee } from "@/types";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [displayMode, setDisplayMode] = useState("card");
  const [isViewForm, setIsViewForm] = useState(false);
  const [isIdpModalOpen, setIsIdpModalOpen] = useState(false);
  const [currentIdpEmployee, setCurrentIdpEmployee] = useState<Employee>();
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showConfirmPushToLead, setShowConfirmPushToLead] = useState(false);
  const [currentPushEmployee, setCurrentPushEmployee] = useState<Employee>();

  const [employees, setEmployees] = useState<Employee[]>([])

  const params = useParams();
  const id = params.id; // This is the slug

  const { data, isLoading } = useGetAppraisalsByCycleIdQuery(id);

  console.log("Ddddd", data)
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const extractedEmployees = data.map((entry) => entry);
      setEmployees(extractedEmployees);
    }
  }, [data])

  const mockSelfAppraisal = {
    delivery_details:
      "Delivered phase 1 of the mobile app successfully within the agreed timeline, collaborating cross-functionally.",
    accomplishments:
      "Implemented new authentication flow, reduced load time by 30%, mentored two junior developers.",
    approach_solution:
      "Adopted agile sprints, established daily syncs to align teams, and proactively addressed blockers.",
    improvement_possibilities:
      "Could have conducted more user testing before release. Plan to involve QA earlier in the next cycle.",
    project_time_frame: "January 2024 - March 2024",
    leads: ["David Lopez"],
  };

  const mockPerformanceFactor = [
    {
      competency: Competency.TECHNICAL,
      strengths:
        "Excellent with TypeScript and React, strong debugging skills.",
      improvements: "Could deepen cloud architecture expertise.",
      rating: 5,
    },
    {
      competency: Competency.FUNCTIONAL,
      strengths:
        "Quickly understands business needs; delivers practical solutions.",
      improvements: "Needs more domain-specific certifications.",
      rating: 4,
    },
    {
      competency: Competency.COMMUNICATION,
      strengths: "Clear communicator; explains complex topics simply.",
      improvements: "Can ask more clarifying questions in meetings.",
      rating: 3,
    },
  ];

  const getProgressFromStatus = (status: string): number => {
    switch (status) {
      case "NA":
        return 0;
      case "INITIATED":
        return 10;
      case "SELF_APPRAISED":
        return 25;
      case "INITIATE_FEEDBACK":
        return 40;
      case "FEEDBACK_SUBMITTED":
        return 60;
      case "MEETING_DONE":
        return 75;
      case "DONE":
        return 90;
      case "ALL_DONE":
        return 100;
      default:
        return 0;
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "NA":
        return "bg-red-100 text-red-800";
      case "INITIATED":
        return "bg-red-100 text-red-800";
      case "SELF_APPRAISED":
        return "bg-blue-100 text-blue-800";
      case "INITIATE_FEEDBACK":
        return "bg-gray-100 text-gray-800";
      case "FEEDBACK_SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "MEETING_DONE":
        return "bg-yellow-100 text-yellow-800";
      case "DONE":
        return "bg-purple-100 text-purple-800";
      case "ALL_DONE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePushToLead = (employee: Employee) => {
    setCurrentPushEmployee(employee);
    setShowConfirmPushToLead(true);
  };

  const confirmPushToLead = () => {
    if (currentPushEmployee) {
      console.log(
        `Pushing ${currentPushEmployee.name} to lead: ${currentPushEmployee.lead}`
      );
      // Update employee status and stage after pushing to lead
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === currentPushEmployee.id
            ? {
              ...emp,
              stage: "FEEDBACK_SUBMITTED",
              progress: 80,
              status: "Meeting Scheduled",
            }
            : emp
        )
      );
    }
    setShowConfirmPushToLead(false);
    setCurrentPushEmployee(undefined);
  };

  const cancelPushToLead = () => {
    setShowConfirmPushToLead(false);
    setCurrentPushEmployee(undefined);
  };

  const handleConductMeeting = (employee: Employee) => {
    setCurrentIdpEmployee(employee);
    setIsIdpModalOpen(true);
  };

  const handleCloseMeeting = () => {
    setShowConfirmClose(true);
  };

  const confirmCloseMeeting = () => {
    if (currentIdpEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === currentIdpEmployee.id
            ? { ...emp, stage: "Finished", progress: 100, status: "Finished" }
            : emp
        )
      );
    }
    setIsIdpModalOpen(false);
    setCurrentIdpEmployee(undefined);
    setShowConfirmClose(false);
  };

  const cancelCloseMeeting = () => {
    setShowConfirmClose(false);
  };

  const PushToLeadConfirmModal = () => {
    if (!showConfirmPushToLead || !currentPushEmployee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Confirm Push to Lead
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to push {currentPushEmployee.name}'s review to
            their lead{" "}
            <span className="font-semibold">{currentPushEmployee.lead}</span>?
            This will advance their review to the next stage.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={cancelPushToLead}>
              Cancel
            </Button>
            <Button
              onClick={confirmPushToLead}
              className="bg-green-600 hover:bg-green-700"
            >
              Yes, Push to Lead
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const IdpModal = () => {
    if (!isIdpModalOpen || !currentIdpEmployee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-900">
              Individual Development Plan - {currentIdpEmployee.name}
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsViewForm(true);
                }}
              >
                <FileText className="h-4 w-4 mr-1" />
                View Form
              </Button>
            </h2>
            <button
              onClick={() => setIsIdpModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <FileText className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  IDP Form Component
                </h3>
                <p className="text-gray-600">
                  This will be replaced with the IDP form component once the
                  contributor's branch is merged.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <Button variant="outline" onClick={() => setIsIdpModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCloseMeeting}
              className="bg-green-600 hover:bg-green-700"
            >
              Close Meeting
            </Button>
          </div>
        </div>

        {showConfirmClose && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Close Meeting
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to close the meeting for{" "}
                {currentIdpEmployee.name}? This will mark their review as
                finished.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={cancelCloseMeeting}>
                  Cancel
                </Button>
                <Button
                  onClick={confirmCloseMeeting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Yes, Close Meeting
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
                  Current Status: {employee.status}
                </span>
                {getProgressFromStatus(employee.status)}%
              </div>
              <Progress value={getProgressFromStatus(employee.status)} className="h-2" />
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => {
                    setIsViewForm(true);
                  }}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  View Form
                </Button>
                <Button size="sm" variant="outline">
                  <User className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                {employee.status === "SELF_APPRAISED" && (
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handlePushToLead(employee)}
                  >
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Push to Lead
                  </Button>
                )}
                {employee.status === "FEEDBACK_SUBMITTED" && (
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleConductMeeting(employee)}
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Conduct Meeting
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <EmployeeForm
        open={isViewForm}
        onOpenChange={setIsViewForm}
        selfAppraisalData={mockSelfAppraisal}
        performanceFactorData={mockPerformanceFactor}
      />
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
                  <Progress value={getProgressFromStatus(employee.status)} className="h-2" />
                  <span className="text-sm text-gray-500">
                    {getProgressFromStatus(employee.status)}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setIsViewForm(true);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost">
                    <User className="h-4 w-4 mr-1" />
                    Contact
                  </Button>

                  {employee.status === "SELF_APPRAISED" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handlePushToLead(employee)}
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Push to Lead
                    </Button>
                  )}
                  {employee.status === "FEEDBACK_SUBMITTED" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleConductMeeting(employee)}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Conduct Meeting
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmployeeForm
        open={isViewForm}
        onOpenChange={setIsViewForm}
        selfAppraisalData={mockSelfAppraisal}
        performanceFactorData={mockPerformanceFactor}
      />
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
      <IdpModal />
      <PushToLeadConfirmModal />
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
