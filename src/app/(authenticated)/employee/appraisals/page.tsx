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

// Mock data - same as your original
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
      team: "Product Development"
    },
    selfAppraisal: null,
    submitted: false
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
      team: "Product Development"
    },
    selfAppraisal: {
      leadNames: ["Mike Chen", "Lisa Park"],
      deliveryDetails: [
        "Implemented new authentication system",
        "Optimized database queries",
        "Led team onboarding sessions"
      ],
      accomplishments: [
        "Reduced API response time by 40%",
        "Mentored 2 junior developers",
        "Documented key processes"
      ],
      approaches: [
        "Used JWT for secure authentication",
        "Added proper indexing to queries",
        "Created structured onboarding plan"
      ],
      improvements: [
        "Better documentation standards",
        "More thorough code reviews",
        "Faster onboarding process"
      ],
      timeFrames: [
        "March 2024",
        "February 2024",
        "January 2024"
      ]
    },
    performanceFactors: [
      {
        competency: "Technical",
        strengths: "Excellent problem-solving skills, strong coding abilities",
        improvementNeeds: "Could document solutions better",
        rating: "9"
      },
      {
        competency: "Functional",
        strengths: "Deep understanding of business requirements",
        improvementNeeds: "Need to think more strategically",
        rating: "8"
      },
      {
        competency: "Communication",
        strengths: "Clear in written communication",
        improvementNeeds: "More assertive in meetings",
        rating: "7"
      },
      {
        competency: "Energy & Drive",
        strengths: "Consistently motivated",
        improvementNeeds: "Better work-life balance",
        rating: "8"
      },
      {
        competency: "Responsibilities & Trust",
        strengths: "Reliable and dependable",
        improvementNeeds: "Could take more initiative",
        rating: "9"
      },
      {
        competency: "Teamwork",
        strengths: "Collaborative and supportive",
        improvementNeeds: "Could mentor more junior staff",
        rating: "8"
      },
      {
        competency: "Managing Processes & Work",
        strengths: "Good at task prioritization",
        improvementNeeds: "Better at estimating timelines",
        rating: "7"
      }
    ],
    individualDevelopmentPlan: {
      technical: "Complete AWS certification by Q3 2024",
      behavioral: "Improve public speaking skills",
      functional: "Take on more architectural responsibilities"
    },
    additionalRemarks: "I particularly enjoyed working on the authentication system and would like to take on more security-related tasks in the future.",
    submitted: true
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
      team: "Product Development"
    },
    selfAppraisal: {
      leadNames: ["Mike Chen"],
      deliveryDetails: [
        "Q4 feature rollout",
        "Documentation overhaul",
        "Client demo preparation"
      ],
      accomplishments: [
        "Delivered features on time",
        "Improved documentation by 30%",
        "Received positive client feedback"
      ],
      approaches: [
        "Agile development methodology",
        "Created documentation templates",
        "Prepared detailed demo scenarios"
      ],
      improvements: [
        "More detailed documentation",
        "Better time estimation",
        "More proactive communication"
      ],
      timeFrames: [
        "October - December 2023",
        "November 2023",
        "December 2023"
      ]
    },
    performanceFactors: [
      {
        competency: "Technical",
        strengths: "Solid implementation skills",
        improvementNeeds: "Need to learn new testing frameworks",
        rating: "8"
      },
      {
        competency: "Functional",
        strengths: "Good at requirements analysis",
        improvementNeeds: "Should understand business context better",
        rating: "7"
      },
      {
        competency: "Communication",
        strengths: "Good listener",
        improvementNeeds: "More confident in presentations",
        rating: "7"
      },
      {
        competency: "Energy & Drive",
        strengths: "Consistent performer",
        improvementNeeds: "More innovative thinking",
        rating: "7"
      },
      {
        competency: "Responsibilities & Trust",
        strengths: "Takes ownership of tasks",
        improvementNeeds: "Should flag risks earlier",
        rating: "8"
      },
      {
        competency: "Teamwork",
        strengths: "Helpful team player",
        improvementNeeds: "Could lead more team activities",
        rating: "8"
      },
      {
        competency: "Managing Processes & Work",
        strengths: "Good at following processes",
        improvementNeeds: "Should suggest process improvements",
        rating: "7"
      }
    ],
    individualDevelopmentPlan: {
      technical: "Learn React testing library",
      behavioral: "Improve presentation skills",
      functional: "Understand business metrics better"
    },
    additionalRemarks: "The Q4 project was challenging but rewarding. I learned a lot about client requirements and expectations.",
    submitted: true
  }
];

const leadOptions = [
  "Mike Chen",
  "Lisa Park",
  "John Smith",
  "Emma Wilson",
  "David Brown",
];

type AppraisalStatus = "pending" | "completed" | "overdue";

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

  // FIXED: Derive current and past appraisals from the main state
  const currentAppraisal = appraisals.find((a) => a.status === "pending") || null;
  const pastAppraisals = appraisals.filter((a) => a.status === "completed");

  // FIXED: Update the appraisals array instead of just currentAppraisal
  const handleSubmitSelfAppraisal = (
    formData: any,
    action: "save" | "submit"
  ) => {
    if (action === "save") {
      console.log("Saving draft:", formData);
      setDraftData(formData);
      setIsModalOpen(false);
      // Optional: Show success message
      alert("Draft saved successfully!");
    } else {
      console.log("Submitting appraisal:", formData);
      
      if (currentAppraisal) {
        // FIXED: Update the appraisals array with the submitted data
        setAppraisals(prevAppraisals => 
          prevAppraisals.map(appraisal => 
            appraisal.id === currentAppraisal.id 
              ? {
                  ...appraisal,
                  selfAppraisal: formData,
                  submitted: true,
                  progress: 100, // Update progress to 100%
                }
              : appraisal
          )
        );
        
        // Clear draft data after successful submission
        setDraftData(null);
        
        // Optional: Show success message
        alert("Self-appraisal submitted successfully!");
      }
      setIsModalOpen(false);
    }
  };

  const handleViewAppraisal = (appraisal: any) => {
    if (!appraisal) return;

    // FIXED: Better handling of form data structure
    let formattedData;
    
    if (appraisal.selfAppraisal) {
      // Check if it's already in the correct format (from recent submission)
      if (appraisal.selfAppraisal.selfAssessments) {
        formattedData = appraisal.selfAppraisal;
      } else {
        // Transform legacy format to new format
        const maxLength = Math.max(
          appraisal.selfAppraisal.deliveryDetails?.length || 0,
          appraisal.selfAppraisal.accomplishments?.length || 0,
          appraisal.selfAppraisal.approaches?.length || 0,
          appraisal.selfAppraisal.improvements?.length || 0,
          appraisal.selfAppraisal.timeFrames?.length || 0
        );

        formattedData = {
          leadNames: appraisal.selfAppraisal.leadNames || [],
          selfAssessments: Array.from({ length: maxLength }, (_, index) => ({
            deliveryDetails: appraisal.selfAppraisal.deliveryDetails?.[index] || '',
            accomplishments: appraisal.selfAppraisal.accomplishments?.[index] || '',
            approaches: appraisal.selfAppraisal.approaches?.[index] || '',
            improvements: appraisal.selfAppraisal.improvements?.[index] || '',
            timeFrame: appraisal.selfAppraisal.timeFrames?.[index] || ''
          })),
          performanceFactors: appraisal.performanceFactors || [],
          individualDevelopmentPlan: appraisal.individualDevelopmentPlan || {},
          additionalRemarks: appraisal.additionalRemarks || ''
        };
      }
    } else {
      // No self appraisal data
      formattedData = {
        leadNames: [],
        selfAssessments: [],
        performanceFactors: [],
        individualDevelopmentPlan: {},
        additionalRemarks: ''
      };
    }

    setViewingAppraisal({
      ...appraisal,
      selfAppraisal: formattedData
    });
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
                <CardTitle>{currentAppraisal.period} Appraisal</CardTitle>
                <Badge
                  className={
                    statusColors[currentAppraisal.status as AppraisalStatus]
                  }
                >
                  <div className="flex items-center gap-1">
                    {statusIcons[currentAppraisal.status as AppraisalStatus]}
                    <span className="capitalize">
                      {currentAppraisal.status}
                    </span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">HR</p>
                  <p className="font-medium">{currentAppraisal.hr}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{currentAppraisal.dueDate}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Progress</p>
                <Progress value={currentAppraisal.progress} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  {currentAppraisal.progress}% complete
                </p>
              </div>

              {currentAppraisal.requiresSelfAppraisal && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">
                        {currentAppraisal.submitted
                          ? "Self Appraisal Submitted"
                          : draftData
                          ? "Draft Saved - Continue Appraisal"
                          : "Self Appraisal Required"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentAppraisal.submitted
                          ? "You can view your submitted appraisal below."
                          : draftData
                          ? "You have a saved draft. Continue where you left off."
                          : "Please complete your self appraisal to proceed."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    {currentAppraisal.submitted ? (
                      <Button
                        variant="outline"
                        onClick={() => handleViewAppraisal(currentAppraisal)}
                      >
                        View Submitted Appraisal
                      </Button>
                    ) : (
                      <Button onClick={() => setIsModalOpen(true)}>
                        {draftData ? "Continue Draft" : "Complete Self Appraisal"}
                      </Button>
                    )}
                  </div>
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
            {pastAppraisals.map((appraisal) => (
              <Card key={appraisal.id}>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>{appraisal.period} Appraisal</CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          statusColors[appraisal.status as AppraisalStatus]
                        }
                      >
                        <div className="flex items-center gap-1">
                          {statusIcons[appraisal.status as AppraisalStatus]}
                          <span className="capitalize">{appraisal.status}</span>
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
                      <p className="font-medium">{appraisal.hr}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed On</p>
                      <p className="font-medium">{appraisal.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <p className="font-medium flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        {appraisal.rating ? `${appraisal.rating}/10.0` : 'Pending'}
                      </p>
                    </div>
                  </div>

                  {appraisal.additionalRemarks && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">
                        Additional Remarks
                      </p>
                      <p className="text-gray-700">{appraisal.additionalRemarks}</p>
                    </div>
                  )}
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
      {currentAppraisal && !currentAppraisal.submitted && (
        <EmployeeSelfAppraisalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitSelfAppraisal}
          employeeData={currentAppraisal.employeeData}
          leadOptions={leadOptions}
          initialData={draftData}
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
          employeeData={viewingAppraisal.employeeData}
          leadOptions={leadOptions}
          isReadOnly={true}
          initialData={viewingAppraisal.selfAppraisal}
        />
      )}
    </div>
  );
}