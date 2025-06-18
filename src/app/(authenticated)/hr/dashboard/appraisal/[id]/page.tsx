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
import { Skeleton } from "@/components/ui/skeleton";
import {
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
  PlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Competency } from "@/components/hr/PerformanceFactorTable";
import EmployeeForm from "./components/EmployeeForm";
import { useGetAppraisalsByCycleIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useParams } from "next/navigation";
import { Employee } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [displayMode, setDisplayMode] = useState<"card" | "table">("card");
  const [isViewForm, setIsViewForm] = useState(false);
  const [isIdpModalOpen, setIsIdpModalOpen] = useState(false);
  const [currentIdpEmployee, setCurrentIdpEmployee] = useState<Employee>();
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showConfirmPushToLead, setShowConfirmPushToLead] = useState(false);
  const [currentPushEmployee, setCurrentPushEmployee] = useState<Employee>();
  const [employees, setEmployees] = useState<Employee[]>([]);

  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useGetAppraisalsByCycleIdQuery(id);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEmployees(data);
    }
  }, [data]);

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

  const handleConductMeeting = (employee: Employee) => {
    setCurrentIdpEmployee(employee);
    setIsIdpModalOpen(true);
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
                    <span className="text-gray-600">
                      Current Status: {employee.status}
                    </span>
                    {getProgressFromStatus(employee.status)}%
                  </div>
                  <Progress
                    value={getProgressFromStatus(employee.status)}
                    className="h-2"
                  />
                  <div className="flex gap-2 flex-wrap" key={employee.id}>
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
                      <div className="text-sm text-gray-500">
                        {employee.role}
                      </div>
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
                    <Progress
                      value={getProgressFromStatus(employee.status)}
                      className="h-2"
                    />
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
                        setCurrentIdpEmployee(employee);
                        setIsIdpModalOpen(true);
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
      </div>
    );

  const PushToLeadConfirmModal = () => (
    <Dialog
      open={showConfirmPushToLead}
      onOpenChange={setShowConfirmPushToLead}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Push to Lead</DialogTitle>
          <DialogDescription>
            Are you sure you want to push {currentPushEmployee?.name}'s review
            to their lead{" "}
            <span className="font-semibold">{currentPushEmployee?.lead}</span>?
            This will advance their review to the next stage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowConfirmPushToLead(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmPushToLead}
            className="bg-green-600 hover:bg-green-700"
          >
            Yes, Push to Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const IdpModal = () => (
    <Dialog open={isIdpModalOpen} onOpenChange={setIsIdpModalOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Individual Development Plan - {currentIdpEmployee?.name}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsViewForm(true)}
            >
              <FileText className="h-4 w-4 mr-1" />
              View Form
            </Button>
          </DialogTitle>
        </DialogHeader>
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
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsIdpModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => setShowConfirmClose(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Close Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const CloseMeetingConfirmModal = () => (
    <Dialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Close Meeting</DialogTitle>
          <DialogDescription>
            Are you sure you want to close the meeting for{" "}
            {currentIdpEmployee?.name}? This will mark their review as finished.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmClose(false)}>
            Cancel
          </Button>
          <Button
            onClick={confirmCloseMeeting}
            className="bg-green-600 hover:bg-green-700"
          >
            Yes, Close Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card className="border border-gray-200  bg-gray-100 h-[90vh] overflow-y-auto rounded-md dark:bg-gray-800">
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
      <IdpModal />
      <PushToLeadConfirmModal />
      <CloseMeetingConfirmModal />
    </Card>
  );
};

export default Index;
