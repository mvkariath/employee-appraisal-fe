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
  PackageOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Competency } from "@/components/hr/PerformanceFactorTable";
import EmployeeForm from "./components/EmployeeForm";
import { useGetAppraisalsByCycleIdQuery, usePushToLeadMutation } from "@/api-service/appraisal/appraisal.api";
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
import IdpModal from "./components/IDPForm";
import { set } from "date-fns";
import Header from "@/components/common/section-header";
import {
  EmployeeCard,
  EmployeeCardSkeleton,
} from "./components/employee-appraisal-card";
import {
  EmployeeTable,
  EmployeeTableSkeleton,
} from "./components/employee-appraiasl-table";
import { EmptyState } from "@/components/common/empty-state";

const Index = () => {
  const [displayMode, setDisplayMode] = useState<"card" | "table">("card");
  const [isViewForm, setIsViewForm] = useState(false);
  const [isIdpModalOpen, setIsIdpModalOpen] = useState(false);
  const [currentIdpEmployee, setCurrentIdpEmployee] = useState<
    Employee & { appraisalId: string }
  >();
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showConfirmPushToLead, setShowConfirmPushToLead] = useState(false);
  const [currentPushEmployee, setCurrentPushEmployee] = useState<
    Employee & { appraisalId: string }
  >();
  const [employees, setEmployees] = useState<
    (Employee & { appraisalId: string })[]
  >([]);

  const params = useParams();
  const id = params.id;

  const { data, isLoading,isFetching } = useGetAppraisalsByCycleIdQuery(id);
  const [pushToLeadMutation]=usePushToLeadMutation()

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEmployees(data);
    }
  }, [data,isFetching]);

  const handlePushToLead = (employee: Employee & { appraisalId: string }) => {
    setCurrentPushEmployee(employee);
    setShowConfirmPushToLead(true);
  };

  const confirmPushToLead = () => {
    if (currentPushEmployee) {
      // setEmployees((prev) =>
      //   prev.map((emp) =>
      //     emp.id === currentPushEmployee.id
      //       ? {
      //           ...emp,
      //           stage: "FEEDBACK_SUBMITTED",
      //           progress: 80,
      //           status: "Meeting Scheduled",
      //         }
      //       : emp
      //   )
      // );
      pushToLeadMutation(Number(currentPushEmployee.appraisalId))
    }
    setShowConfirmPushToLead(false);
    setCurrentPushEmployee(undefined);
  };

  const handleConductMeeting = (
    employee: Employee & { appraisalId: string }
  ) => {
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

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? [...Array(6)].map((_, i) => <EmployeeCardSkeleton key={i} />)
        : employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onViewForm={(emp) => {
                setIsViewForm(true);
                setCurrentIdpEmployee(emp);
              }}
              onPushToLead={handlePushToLead}
              onConductMeeting={handleConductMeeting}
            />
          ))}
    </div>
  );

  const renderTableView = () =>
    isLoading ? (
      <EmployeeTableSkeleton rows={5} /> // Specify how many skeleton rows you want
    ) : (
      <EmployeeTable
        employees={employees}
        onViewForm={(employee) => {
          setCurrentIdpEmployee(employee);
          setIsIdpModalOpen(true);
        }}
        onPushToLead={handlePushToLead}
        onConductMeeting={handleConductMeeting}
      />
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
            {/* <span className="font-semibold">{currentPushEmployee?.lead}</span>? */}
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
  if (!data || !data.length) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="No Employees Added Yet"
        description="Get started by creating your adding performance review cycle for your team."
      />
    );
  }
  return (
    <>
      <Header
        title="Employee Progress"
        subtitle="Track and manage employee appraisal progress"
        endAddon={
          <div className="flex gap-2">
            <Button
              variant={displayMode === "card" ? "secondary" : "default"}
              size="sm"
              onClick={() => setDisplayMode("card")}
            >
              <Grid className="h-4 w-4 mr-2" />
              Card View
            </Button>
            <Button
              variant={displayMode === "table" ? "secondary" : "default"}
              size="sm"
              onClick={() => setDisplayMode("table")}
            >
              <Table className="h-4 w-4 mr-2" />
              Table View
            </Button>
          </div>
        }
      />

      <CardContent className="container mx-auto px-6 py-8">
        {displayMode === "card" ? renderCardView() : renderTableView()}
      </CardContent>

      {currentIdpEmployee && (
        <EmployeeForm
          open={isViewForm}
          onOpenChange={(open)=>{
            setIsViewForm(open)
          }}
          appraisal={currentIdpEmployee}
        />
      )}
      {isIdpModalOpen && currentIdpEmployee && (
        <IdpModal
          isOpen={isIdpModalOpen}
          onClose={() => setIsIdpModalOpen(false)}
          
          appraisalId={currentIdpEmployee.appraisalId}
        />
      )}
      <PushToLeadConfirmModal />
      <CloseMeetingConfirmModal />
    </>
  );
};

export default Index;
