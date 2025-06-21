// app/employee/appraisals/page.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import EmployeeSelfAppraisalModal from "../components/EmployeeSelfAppraisalModal";
import { useGetPastAppraisalsQuery } from "@/api-service/appraisal/appraisal.api";
import { useGetEmployeeByIdQuery } from "@/api-service/employees/employee.api";
import { useGetAppraisalByEmployeeIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useUpdateAppraisalMutation } from "@/api-service/appraisal/appraisal.api";
import { useFillformMutation } from "@/api-service/employees/employee.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetEmployeesQuery } from "@/api-service/employees/employee.api";
import { map } from "zod";
// Mock data - same as your original
function HRName({ id }: { id: number }) {
  const { data, isLoading } = useGetEmployeeByIdQuery({ id });
  if (isLoading) return <>Loading...</>;
  return <>{data?.name || "Unknown HR"}</>;
}
// Define defaultFormData for fallback usage in mapBackendAppraisalToFormData
const defaultFormData = {
  leadId: [],
  selfAssessments: [
    {
      deliveryDetails: "",
      accomplishments: "",
      approaches: "",
      improvements: "",
      timeFrame: "",
    },
  ],
  performanceFactors: [],
  individualDevelopmentPlan: {
    technical: "",
    behavioral: "",
    functional: "",
  },
  additionalRemarks: "",
};

function mapBackendAppraisalToFormData(appraisal: any) {
  if (!appraisal) return defaultFormData;

  return {
    leadId: appraisal.appraisalLeads?.map((lead: any) => lead.id) || [],

    selfAssessments: appraisal.self_appraisal?.length
      ? appraisal.self_appraisal.map((sa: any) => ({
          deliveryDetails: sa.delivery_details || "",
          accomplishments: sa.accomplishments || "",
          approaches: sa.approach_solution || "",
          improvements: sa.improvement_possibilities || "",
          timeFrame: sa.project_time_frame || "",
        }))
      : [{ ...defaultFormData.selfAssessments[0] }],

    performanceFactors: (appraisal.performance_factors || []).map(
      (pf: any) => ({
        competency: pf.competency || "",
        strengths: pf.strengths || "",
        improvementNeeds: pf.improvements || "",
        rating: pf.rating?.toString() || "",
      })
    ),

    individualDevelopmentPlan: {
      technical:
        appraisal.idp?.find((i: any) => i.competency === "TECHNICAL")
          ?.technical_objective || "",
      behavioral:
        appraisal.idp?.find((i: any) => i.competency === "BEHAVIORAL")
          ?.technical_objective || "",
      functional:
        appraisal.idp?.find((i: any) => i.competency === "FUNCTIONAL")
          ?.technical_objective || "",
    },

    additionalRemarks: appraisal.additionalRemarks || "",
  };
}


function mapEmployeeToModalData(employeeOrAppraisal: any): any {
  if (!employeeOrAppraisal) {
     return { name: '', designation: '', employeeNumber: '', team: '' };
  }
  // If it's an appraisal object with an employee field
  if (employeeOrAppraisal && employeeOrAppraisal.employee) {
    return {
      name: employeeOrAppraisal.employee.name || "",
      designation: employeeOrAppraisal.employee.role || "",
      employeeNumber: employeeOrAppraisal.employee.employeeId || "",
      team: employeeOrAppraisal.employee.department || "",
    };
  }
  // If it's a nested employee object
  if (
    employeeOrAppraisal &&
    employeeOrAppraisal.name &&
    employeeOrAppraisal.employeeId
  ) {
    return {
      name: employeeOrAppraisal.name || "",
      designation: employeeOrAppraisal.role || "",
      employeeNumber: employeeOrAppraisal.employeeId || "",
      team: employeeOrAppraisal.department || "",
    };
  }
  // Fallback for other shapes
  return {
    name: employeeOrAppraisal.employee_name || "",
    designation:
      employeeOrAppraisal.designation || employeeOrAppraisal.role || "",
    employeeNumber:
      employeeOrAppraisal.employeeId ||
      employeeOrAppraisal.id?.toString() ||
      "",
    team: employeeOrAppraisal.department || "",
  };
}
function getAverageRating(performanceFactors: any[]): string {
  if (!performanceFactors || performanceFactors.length === 0) return "N/A";
  const ratings = performanceFactors
    .map((pf) => pf.rating)
    .filter((r) => typeof r === "number" && !isNaN(r));
  if (ratings.length === 0) return "N/A";
  const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  return avg.toFixed(2);
}
const statusFlow = [
  "INITIATED",
  "SELF_APPRAISED",
  "INITIATE_FEEDBACK",
  "FEEDBACK_SUBMITTED",
  "MEETING_DONE",
  "DONE",
  "ALL_DONE",
];
function getProgressForStatus(status: string): number {
  const idx = statusFlow.indexOf(status);
  if (idx === -1) return 0;
  return Math.round(((idx + 1) / statusFlow.length) * 100);
}
function mapBackendStatusToUI(
  status: string
): "pending" | "completed" | "overdue" {
  if (status === "ALL_DONE") return "completed";
  if (
    status === "INITIATED" ||
    status === "SELF_APPRAISED" ||
    status === "INITIATE_FEEDBACK" ||
    status === "FEEDBACK_SUBMITTED" ||
    status === "MEETING_DONE" ||
    status === "DONE"
  )
    return "pending";
  return "pending";
}

type AppraisalStatus =
  | "NA"
  | "INITIATED"
  | "SELF-APPRAISED"
  | "LEAD-APPRAISED"
  | "HR-APPRAISED"
  | "ALL_DONE";

const statusIcons = {
  pending: <Clock className="h-4 w-4" />,
  completed: <CheckCircle2 className="h-4 w-4" />,
  overdue: <AlertCircle className="h-4 w-4" />,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
};

export default function AppraisalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAppraisal, setViewingAppraisal] = useState<any>(null);
  const { data: employees = [], isLoading: employeesLoading } =
    useGetEmployeesQuery();
  const leadOptions = employees
    .filter((emp) => emp.role === "LEAD")
    .map((emp) => ({ id: emp.id, name: emp.name }));

  let employeeId: number | null = null;
  if (typeof window !== "undefined") {
    const tokenStr = localStorage.getItem("token");
    if (tokenStr) {
      try {
        const token = JSON.parse(tokenStr);
        employeeId = Number(token.id);
      } catch {
        employeeId = null;
      }
    }
  }
  const { data: employeeData } = useGetEmployeeByIdQuery(
    employeeId !== null ? { id: employeeId } : skipToken
  );
  
  // --- FIX 1: Combined the two identical hook calls into one ---
  const {
    data: allAppraisals = [],
    isLoading: isCurrentLoading,
    error: currentError,
    refetch: refetchAppraisals, // Get the refetch function here
  } = useGetAppraisalByEmployeeIdQuery(
    employeeId ? employeeId : skipToken, 
    { refetchOnMountOrArgChange: true } // Ensure fresh data on component load
  );

  const currentAppraisal =
    allAppraisals.find((a: any) => a.current_status !== "ALL_DONE") || null;

  const {
    data: pastAppraisals = [],
    isLoading,
    error,
  } = useGetPastAppraisalsQuery(employeeId ? employeeId : skipToken);

  const [updateAppraisal] = useUpdateAppraisalMutation();

  const handleSubmitSelfAppraisal = async (
    formData: any,
    action: "draft" | "submit"
  ) => {
    if (!currentAppraisal) return;
    console.log("Submitting self-appraisal with data:", formData);
    const update_payload = {
      appraisalId: currentAppraisal.id,
      data: {
        appraisalLeads: formData.leadId,
        self_appraisal: formData.selfAssessments.map((a: any) => ({
          delivery_details: a.deliveryDetails,
          accomplishments: a.accomplishments,
          approach_solution: a.approaches,
          improvement_possibilities: a.improvements,
          project_time_frame: a.timeFrame,
          leadId: formData.leadId,
        })),
        save_type: action,
      },
    };

    try {
      // Using .unwrap() will cause the promise to resolve on success or throw an error
      await updateAppraisal(update_payload).unwrap();
      // Refetch the data to get the latest status from the server
      await refetchAppraisals();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to submit self-appraisal:", err);
      // Optionally show an error toast to the user here
    }
  };

  const handleViewAppraisal = (appraisal: any) => {
    setViewingAppraisal(appraisal);
    setIsViewModalOpen(true);
  };
  
  // --- FIX 2: Create a clear, robust boolean for the button logic ---
  const selfAppraisalCompleted = currentAppraisal 
    ? statusFlow.indexOf(currentAppraisal.current_status) >= statusFlow.indexOf("SELF_APPRAISED")
    : false;
    console.log("currentAppraisal:", currentAppraisal);
  console.log("mappingAppraisal:",mapBackendAppraisalToFormData(currentAppraisal));
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Appraisals</h1>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Appraisal</h2>
        {isCurrentLoading ? <p>Loading current appraisal...</p> : currentAppraisal ? (
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle>{currentAppraisal.cycle?.name} </CardTitle>
                <Badge
                  className={
                    statusColors[
                      mapBackendStatusToUI(currentAppraisal.current_status)
                    ]
                  }
                >
                  <div className="flex items-center gap-1">
                    {
                      statusIcons[
                        mapBackendStatusToUI(currentAppraisal.current_status)
                      ]
                    }
                    <span className="capitalize">
                      {currentAppraisal.current_status.replace("_", " ")}
                    </span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">HR</p>
                  {currentAppraisal.cycle?.created_by?.id ? (
                    <HRName id={currentAppraisal.cycle.created_by.id} />
                  ) : (
                    "N/A"
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">
                    {currentAppraisal.createdAt
                      ? new Date(
                          new Date(currentAppraisal.createdAt).getTime() +
                            7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Progress</p>
                <Progress
                  value={getProgressForStatus(currentAppraisal.current_status)}
                  className="h-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {getProgressForStatus(currentAppraisal.current_status)}%
                  complete
                </p>
              </div>

              <CardFooter className="px-0 pt-4">
                {/* --- FIX 3: Use the new boolean for clean and correct rendering --- */}
                {selfAppraisalCompleted ? (
                    <Button
                      variant="outline"
                      onClick={() => handleViewAppraisal(currentAppraisal)}
                    >
                      View Submitted Appraisal
                    </Button>
                  ) : (
                    <Button onClick={() => setIsModalOpen(true)}>
                      Fill Self Appraisal
                    </Button>
                )}
              </CardFooter>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No current appraisal in progress.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Appraisals Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Appraisals</h2>
        {isLoading ? <p>Loading past appraisals...</p> : pastAppraisals.length > 0 ? (
          <div className="space-y-4">
            {pastAppraisals.map((appraisal: any) => (
              <Card key={appraisal.id}>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>{appraisal.cycle_name}</CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={statusColors.completed} // Past appraisals are always completed
                      >
                        <div className="flex items-center gap-1">
                          {statusIcons.completed}
                          <span className="capitalize">
                            Completed
                          </span>
                        </div>
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewAppraisal(appraisal)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">HR</p>
                       {appraisal?.created_by?.id ? (
                        <HRName id={appraisal.created_by.id} />
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed On</p>
                      <p className="font-medium">
                        {appraisal.closed_at
                          ? new Date(appraisal.closed_at).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-medium flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {getAverageRating(appraisal.performance_factors) || 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No past appraisals found.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Self Appraisal Modal */}
      {currentAppraisal && (
        <EmployeeSelfAppraisalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitSelfAppraisal}
          employeeData={mapEmployeeToModalData(currentAppraisal.employee)}
          leadOptions={leadOptions}
          initialData={mapBackendAppraisalToFormData(currentAppraisal)}
          isReadOnly={selfAppraisalCompleted} // Use the same boolean here
          currentStatus={currentAppraisal.current_status}
        />
      )}

      {/* View Submitted Appraisal Modal */}
      {isViewModalOpen && viewingAppraisal && (
        <EmployeeSelfAppraisalModal
          key={`view-modal-${viewingAppraisal.id}`}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingAppraisal(null);
          }}
          onSubmit={() => {}}
          employeeData={mapEmployeeToModalData(employeeData)}
          leadOptions={leadOptions}
          isReadOnly={true}
          initialData={mapBackendAppraisalToFormData(viewingAppraisal)}
          currentStatus={viewingAppraisal.current_status || viewingAppraisal.appraisal_status} // Handle both past and current
        />
      )}
    </div>
  );
}