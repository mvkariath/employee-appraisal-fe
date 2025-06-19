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
import { useUpdateAppraisalMutation } from "@/api-service/appraisal/appraisal.api";
import { skipToken } from "@reduxjs/toolkit/query";
import ChatBot from "../components/chatbot";
// Mock data - same as your original
function HRName({ id }: { id: number }) {
  const { data, isLoading } = useGetEmployeeByIdQuery({ id });
  if (isLoading) return <>Loading...</>;
  return <>{data?.name || "Unknown HR"}</>;
}
function mapBackendAppraisalToFormData(appraisal: any) {
  const sa = appraisal.self_appraisal?.[0] || {};
  // Extract lead names from appraisalLeads
  const leadNames =
    appraisal.appraisalLeads?.map((al: any) => al.lead?.name).filter(Boolean) || [];

  return {
    leadNames,
    selfAssessments: [
      {
        deliveryDetails: sa.delivery_details || "",
        accomplishments: sa.accomplishments || "",
        approaches: sa.approach_solution || "",
        improvements: sa.improvement_possibilities || "",
        timeFrame: sa.project_time_frame || "",
      },
    ],
    performanceFactors: (appraisal.performance_factors || []).map((pf: any) => ({
      competency: pf.competency || "",
      strengths: pf.strengths || "",
      improvementNeeds: pf.improvements || "",
      rating: pf.rating?.toString() || "",
    })),
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
function mapEmployeeToModalData(employee: any): any {
  return {
    name: employee?.name || "",
    designation: employee?.role || "",
    employeeNumber: employee?.employeeId || "",
    team: employee?.department || "",
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
  // Add more mappings as needed
  return "pending";
}
const initialAppraisals = [
  {
    id: 1,
    period: "Q2 2024",
    status: "pending",
    progress: 60,
    hr: "John Smith",
    dueDate: "2024-06-30",
    requiresSelfAppraisal: true,
    rating: null,
    employeeData: {
      name: "Sarah Johnson",
      designation: "Senior Developer",
      employeeNumber: "EMP-2045",
      team: "Product Development",
    },
    selfAppraisal: null,
    submitted: false,
  },
  {
    id: 2,
    period: "Q1 2024",
    status: "completed",
    progress: 100,
    hr: "John Smith",
    dueDate: "2024-03-31",
    requiresSelfAppraisal: true,
    rating: 8.5,
    employeeData: {
      name: "Sarah Johnson",
      designation: "Senior Developer",
      employeeNumber: "EMP-2045",
      team: "Product Development",
    },
    selfAppraisal: {
      leadNames: ["Mike Chen", "Lisa Park"],
      deliveryDetails: [
        "Implemented new authentication system",
        "Optimized database queries",
        "Led team onboarding sessions",
      ],
      accomplishments: [
        "Reduced API response time by 40%",
        "Mentored 2 junior developers",
        "Documented key processes",
      ],
      approaches: [
        "Used JWT for secure authentication",
        "Added proper indexing to queries",
        "Created structured onboarding plan",
      ],
      improvements: [
        "Better documentation standards",
        "More thorough code reviews",
        "Faster onboarding process",
      ],
      timeFrames: ["March 2024", "February 2024", "January 2024"],
    },
    performanceFactors: [
      {
        competency: "Technical",
        strengths: "Excellent problem-solving skills, strong coding abilities",
        improvementNeeds: "Could document solutions better",
        rating: "9",
      },
      {
        competency: "Functional",
        strengths: "Deep understanding of business requirements",
        improvementNeeds: "Need to think more strategically",
        rating: "8",
      },
      {
        competency: "Communication",
        strengths: "Clear in written communication",
        improvementNeeds: "More assertive in meetings",
        rating: "7",
      },
      {
        competency: "Energy & Drive",
        strengths: "Consistently motivated",
        improvementNeeds: "Better work-life balance",
        rating: "8",
      },
      {
        competency: "Responsibilities & Trust",
        strengths: "Reliable and dependable",
        improvementNeeds: "Could take more initiative",
        rating: "9",
      },
      {
        competency: "Teamwork",
        strengths: "Collaborative and supportive",
        improvementNeeds: "Could mentor more junior staff",
        rating: "8",
      },
      {
        competency: "Managing Processes & Work",
        strengths: "Good at task prioritization",
        improvementNeeds: "Better at estimating timelines",
        rating: "7",
      },
    ],
    individualDevelopmentPlan: {
      technical: "Complete AWS certification by Q3 2024",
      behavioral: "Improve public speaking skills",
      functional: "Take on more architectural responsibilities",
    },
    additionalRemarks:
      "I particularly enjoyed working on the authentication system and would like to take on more security-related tasks in the future.",
    submitted: true,
  },
  {
    id: 3,
    period: "Q4 2023",
    status: "completed",
    progress: 100,
    hr: "Sarah Johnson",
    dueDate: "2023-12-31",
    requiresSelfAppraisal: true,
    rating: 7.8,
    employeeData: {
      name: "Sarah Johnson",
      designation: "Senior Developer",
      employeeNumber: "EMP-2045",
      team: "Product Development",
    },
    selfAppraisal: {
      leadNames: ["Mike Chen"],
      deliveryDetails: [
        "Q4 feature rollout",
        "Documentation overhaul",
        "Client demo preparation",
      ],
      accomplishments: [
        "Delivered features on time",
        "Improved documentation by 30%",
        "Received positive client feedback",
      ],
      approaches: [
        "Agile development methodology",
        "Created documentation templates",
        "Prepared detailed demo scenarios",
      ],
      improvements: [
        "More detailed documentation",
        "Better time estimation",
        "More proactive communication",
      ],
      timeFrames: ["October - December 2023", "November 2023", "December 2023"],
    },
    performanceFactors: [
      {
        competency: "Technical",
        strengths: "Solid implementation skills",
        improvementNeeds: "Need to learn new testing frameworks",
        rating: "8",
      },
      {
        competency: "Functional",
        strengths: "Good at requirements analysis",
        improvementNeeds: "Should understand business context better",
        rating: "7",
      },
      {
        competency: "Communication",
        strengths: "Good listener",
        improvementNeeds: "More confident in presentations",
        rating: "7",
      },
      {
        competency: "Energy & Drive",
        strengths: "Consistent performer",
        improvementNeeds: "More innovative thinking",
        rating: "7",
      },
      {
        competency: "Responsibilities & Trust",
        strengths: "Takes ownership of tasks",
        improvementNeeds: "Should flag risks earlier",
        rating: "8",
      },
      {
        competency: "Teamwork",
        strengths: "Helpful team player",
        improvementNeeds: "Could lead more team activities",
        rating: "8",
      },
      {
        competency: "Managing Processes & Work",
        strengths: "Good at following processes",
        improvementNeeds: "Should suggest process improvements",
        rating: "7",
      },
    ],
    individualDevelopmentPlan: {
      technical: "Learn React testing library",
      behavioral: "Improve presentation skills",
      functional: "Understand business metrics better",
    },
    additionalRemarks:
      "The Q4 project was challenging but rewarding. I learned a lot about client requirements and expectations.",
    submitted: true,
  },
];

const leadOptions = [
  "Mike Chen",
  "Lisa Park",
  "John Smith",
  "Emma Wilson",
  "David Brown",
];

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
  const [appraisals, setAppraisals] = useState(initialAppraisals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAppraisal, setViewingAppraisal] = useState<any>(null);
  const [draftData, setDraftData] = useState<any>(null);
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
  const handleSubmitSelfAppraisal = async (formData: any, action: "save" | "submit") => {
    if (!currentAppraisal) return;
    try {
      await updateAppraisal({
        id: currentAppraisal.id,
        data: {
          self_appraisal: [
            {
              delivery_details: formData.selfAssessments[0].deliveryDetails,
              accomplishments: formData.selfAssessments[0].accomplishments,
              approach_solution: formData.selfAssessments[0].approaches,
              improvement_possibilities: formData.selfAssessments[0].improvements,
              project_time_frame: formData.selfAssessments[0].timeFrame,
            },
          ],
          // Add other fields as needed
          // Indicate draft or submitted
          isDraft: action === "save",
          isSubmitted: action === "submit",
          current_status: action === "submit" ? "SELF_APPRAISED" : currentAppraisal.current_status,
        },
      }).unwrap();

      setIsModalOpen(false);
      if (action === "save") {
        alert("Draft saved successfully!");
      } else {
        alert("Self-appraisal submitted successfully!");
      }
    } catch (err) {
      alert("Failed to save/submit appraisal. Please try again.");
    }
  };

  const handleViewAppraisal = (appraisal: any) => {
  if (!appraisal) return;

  // Transform backend self_appraisal array to FormData
  setViewingAppraisal({
    ...appraisal,
    selfAppraisal: mapBackendAppraisalToFormData(appraisal),
  });
  setIsViewModalOpen(true);
  setIsViewModalOpen(true);
};

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
                  currentAppraisal.self_appraisal.length > 0 ? (
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
                    <CardTitle>{appraisal.cycle.name}</CardTitle>
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
                      {/* <p className="font-medium"> {hrIdToName[appraisal.cycle?.created_by] || "Loading..."}</p>
                       */}
                      {appraisal.cycle?.created_by?.id ? (
                        <HRName id={appraisal.cycle.created_by.id} />
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
          initialData={draftData}
          isReadOnly={!!(currentAppraisal.self_appraisal && currentAppraisal.self_appraisal.length > 0 && currentAppraisal.current_status === "SELF_APPRAISED")}
        />
      )}

      {/* View Submitted Appraisal Modal */}
      {viewingAppraisal && (
        <EmployeeSelfAppraisalModal
          key={`view-modal-${viewingAppraisal.id}`}
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingAppraisal(null);
          }}
          onSubmit={() => {}}
          employeeData={mapEmployeeToModalData(viewingAppraisal.employee)}
          leadOptions={leadOptions}
          isReadOnly={true}
          initialData={viewingAppraisal.selfAppraisal}

        />
      )}
    </div>
  );
}
