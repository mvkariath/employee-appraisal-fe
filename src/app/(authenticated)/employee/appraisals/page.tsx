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
import { GeminiAppraisalSummaryChat } from "../components/SummaryGenerator";
import { useGetPastAppraisalsQuery } from "@/api-service/appraisal/appraisal.api";
import { useGetEmployeeByIdQuery } from "@/api-service/employees/employee.api";
import { useGetAppraisalByEmployeeIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useUpdateAppraisalMutation } from "@/api-service/appraisal/appraisal.api";
import { useFillformMutation } from "@/api-service/employees/employee.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetEmployeesQuery } from "@/api-service/employees/employee.api";
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
  // If you store leadId in self_appraisal[0]
  const sa = appraisal.self_appraisal?.[0] || {};
  const leadId = sa.leadId || [];

  return {
    leadId: Array.isArray(leadId) ? leadId : [leadId],
    selfAssessments: appraisal.self_appraisal
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
  // console.log("Mapping status:", status);
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
  // Add more mappings as needed
  return "pending";
}

// const leadOptions = [
//   { id: 1, name: "Mike Chen" },
//   { id: 2, name: "Lisa Park" },
// ];

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
  // FIXED: Use a single appraisals state array instead of separate current/past
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAppraisal, setViewingAppraisal] = useState<any>(null);
  const [draftData, setDraftData] = useState<any>(null);
  const { data: employees = [], isLoading: employeesLoading } =
    useGetEmployeesQuery();
  const leadOptions = employees
    .filter((emp) => emp.role === "LEAD")
    .map((emp) => ({ id: emp.id, name: emp.name }));
  console.log("Lead Options:", leadOptions);
  // const [selectedAppraisalId, setSelectedAppraisalId] = useState<number | null>(
  //   null
  // );

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
  const {
    data: allAppraisals = [],
    isLoading: isCurrentLoading,
    error: currentError,
  } = useGetAppraisalByEmployeeIdQuery(employeeId ? employeeId : skipToken);

  const currentAppraisal =
    allAppraisals.find((a: any) => a.current_status !== "ALL_DONE") || null;
  console.log("Current Appraisal:", currentAppraisal);
  // FIXED: Derive current and past appraisals from the main state
  // const currentAppraisal =
  //   appraisals.find((a) => a.status === "pending") || null;
  // const pastAppraisals = appraisals.filter((a) => a.status === "completed");
  const {
    data: pastAppraisals = [],
    isLoading,
    error,
  } = useGetPastAppraisalsQuery(employeeId ? employeeId : skipToken);
  console.log("Past Appraisals:", pastAppraisals);
  //   const { data: fullAppraisal, isLoading: isFullLoading } = useGetAppraisalByIdQuery(
  //   selectedAppraisalId ?? skipToken
  // );
  // console.log("Full appraisal fetched:", fullAppraisal, "for id", selectedAppraisalId);
  //   const hrIds = Array.from(
  //   new Set(
  //     pastAppraisals
  //       .map(a => a.cycle?.created_by?.id)
  //       .filter((id): id is number => typeof id === "number")
  //   )
  // );
  // console.log("HR IDs:", hrIds);
  // const hrDetails = hrIds.map((id) => {
  //   const { data } = useGetEmployeeByIdQuery({ id: id as number });
  //   console.log("HR Data for ID:", id, data);
  //   return { id, name: data?.name || "Loading..." };
  // });

  // const hrIdToName = Object.fromEntries(hrDetails.map((hr) => [hr.id, hr.name]));

  // FIXED: Update the appraisals array instead of just currentAppraisal
  const [updateAppraisal] = useUpdateAppraisalMutation();
  const [fillForm] = useFillformMutation();
  // console.log(viewingAppraisal);
  const {
  data: newAppraisals = [],
  isLoading: isCurrentlyLoading,
  error: newError,
  refetch: refetchAppraisals, // <--- add this
} = useGetAppraisalByEmployeeIdQuery(employeeId ? employeeId : skipToken);
  const handleSubmitSelfAppraisal = async (
    formData: any,
    action: "draft" | "submit"
  ) => {
    if (!currentAppraisal) return;
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
        save_type: "submit",
        // appraisalStatus: action === "draft" ? "SELF_APPRAISED" : "INITIATE_FEEDBACK",
      
      },
      
    };

    await updateAppraisal(update_payload);
    await refetchAppraisals();
    setIsModalOpen(false);
  };

  // const [viewingAppraisal, setViewingAppraisal] = useState<any>(null);
  const handleViewAppraisal = (appraisal: any) => {
    console.log("Selected appraisal for view:", appraisal);
    setViewingAppraisal(appraisal);
    setIsViewModalOpen(true);
  };
  // console.log("Current Appraisal:", currentAppraisal);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Appraisals</h1>

      {/* Current Appraisal Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Appraisal</h2>
        {currentAppraisal ? (
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
                      {currentAppraisal.current_status}
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

              {currentAppraisal && (
                <div className="flex gap-3 mt-3">
                  {currentAppraisal.self_appraisal &&
                  currentAppraisal.self_appraisal.length > 0 &&
                  currentAppraisal.current_status === "SELF_APPRAISED" ? (
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
                </div>
              )}
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
        {pastAppraisals.length > 0 ? (
          <div className="space-y-4">
            {pastAppraisals.map((appraisal: any) => (
              <Card key={appraisal.id}>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>{appraisal.cycle_name}</CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          statusColors[
                            mapBackendStatusToUI(appraisal.current_status)
                          ]
                        }
                      >
                        <div className="flex items-center gap-1">
                          {
                            statusIcons[
                              mapBackendStatusToUI(appraisal.current_status)
                            ]
                          }
                          <span className="capitalize">
                            {appraisal.current_status}
                          </span>
                        </div>
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // console.log("Viewing appraisal:", appraisal);
                          handleViewAppraisal(appraisal);
                        }}
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
                      {/* <p className="font-medium"> {hrIdToName[appraisal.cycle?.created_by] || "Loading..."}</p>
                       */}
                      {appraisal?.created_by ? (
                        <HRName id={appraisal.created_by.id} />
                      ) : (
                        "N/A"
                      )}
                      {/* <p className="font-medium">
                        {appraisal?.created_by || "N/A"}</p>
                    // </div> */}
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
                        {getAverageRating(appraisal.performance_factors)}
                      </p>
                    </div>
                  </div>

                  {/* {appraisal.additionalRemarks && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">
                        Additional Remarks
                      </p>
                      <p className="text-gray-700">{appraisal.additionalRemarks}</p>
                    </div>
                  )} */}
                  {/* {appraisal.selfAppraisal && (
                    <GeminiAppraisalSummaryChat appraisalData={appraisal} />
                  )} */}
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
      {currentAppraisal && currentAppraisal.current_status !== "ALL DONE" && (
        <EmployeeSelfAppraisalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitSelfAppraisal}
          employeeData={mapEmployeeToModalData(currentAppraisal.employee)}
          leadOptions={leadOptions}
          initialData={mapBackendAppraisalToFormData(currentAppraisal)}
          isReadOnly={
            !!(
              currentAppraisal.self_appraisal &&
              currentAppraisal.self_appraisal.length > 0 &&
              currentAppraisal.current_status === "SELF_APPRAISED"
            )
          }
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
          employeeData={mapEmployeeToModalData(viewingAppraisal)}
          leadOptions={leadOptions}
          isReadOnly={true}
          initialData={mapBackendAppraisalToFormData(viewingAppraisal)}
        />
      )}
    </div>
  );
}
