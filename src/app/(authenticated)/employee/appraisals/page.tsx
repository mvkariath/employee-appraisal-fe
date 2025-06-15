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
// Mock data for appraisals
const appraisals = [
  {
    id: 1,
    period: "Q2 2024",
    status: "pending",
    progress: 60,
    hr: "John Smith",
    dueDate: "2024-06-30",
    requiresSelfAppraisal: true,
    rating: null,
    feedback: null,
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
    rating: 4.2,
    feedback:
      "Excellent performance this quarter with notable contributions to the team project.",
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
        "Fixed critical production bugs",
      ],
      accomplishments: [
        "Reduced API response time by 40%",
        "Mentored 2 junior developers",
        "Documented key processes",
        "Improved test coverage to 85%",
      ],
      approaches: [
        "Used JWT for secure authentication",
        "Added proper indexing to queries",
        "Created structured onboarding plan",
        "Implemented proper error handling",
      ],
      improvements: ["Better documentation", "More code reviews", "", ""],
      timeFrames: [
        "March 2024",
        "February 2024",
        "January 2024",
        "Throughout quarter",
      ],
      developmentPlan:
        "1. Complete AWS certification by Q3\n2. Improve public speaking skills\n3. Take on more architectural responsibilities",
      remarks:
        "I enjoyed working on the authentication system and would like to take on more security-related tasks.",
    },
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
    rating: 3.8,
    feedback:
      "Good work overall, with room for improvement in documentation. Showed great initiative in the Q4 project.",
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
        "Year-end system cleanup",
      ],
      accomplishments: [
        "Delivered features on time",
        "Improved documentation by 30%",
        "Received positive client feedback",
        "Identified system optimizations",
      ],
      approaches: [
        "Agile development",
        "Created templates",
        "Prepared detailed scenarios",
        "System analysis",
      ],
      improvements: [
        "More detailed documentation",
        "Better time estimation",
        "More proactive communication",
        "",
      ],
      timeFrames: [
        "October - December 2023",
        "November 2023",
        "December 2023",
        "December 2023",
      ],
      developmentPlan:
        "1. Improve documentation skills\n2. Learn new testing frameworks\n3. Enhance client communication",
      remarks:
        "The Q4 project was challenging but rewarding. I learned a lot about client requirements.",
    },
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
  const [currentAppraisal, setCurrentAppraisal] = useState(
    appraisals.find((a) => a.status === "pending") || null
  );
  const [pastAppraisals] = useState(
    appraisals.filter((a) => a.status === "completed")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingAppraisal, setViewingAppraisal] = useState<any>(null);

  const handleSubmitSelfAppraisal = (
    formData: any,
    action: "save" | "submit"
  ) => {
    if (action === "save") {
      console.log("Saving draft:", formData);
      // Update local state or API call to save draft
    } else {
      console.log("Submitting appraisal:", formData);
      // Update the appraisal in state
      if (currentAppraisal) {
        const updatedAppraisal = {
          ...currentAppraisal,
          selfAppraisal: formData,
          submitted: true,
        };
        setCurrentAppraisal(updatedAppraisal);
      }
    }
  };

  const handleViewAppraisal = (appraisal: any) => {
    if (!appraisal.selfAppraisal) return;

    // Create a deep copy of the appraisal to avoid reference issues
    const appraisalCopy = JSON.parse(JSON.stringify(appraisal));

    // Transform the data structure
    const formattedData = {
      leadNames: appraisalCopy.selfAppraisal.leadNames || [],
      assessments: appraisalCopy.selfAppraisal.deliveryDetails.map(
        (_: any, index: number) => ({
          deliveryDetails:
            appraisalCopy.selfAppraisal.deliveryDetails[index] || "",
          accomplishments:
            appraisalCopy.selfAppraisal.accomplishments[index] || "",
          approaches: appraisalCopy.selfAppraisal.approaches[index] || "",
          improvements: appraisalCopy.selfAppraisal.improvements[index] || "",
          timeFrame: appraisalCopy.selfAppraisal.timeFrames?.[index] || "",
        })
      ),
      developmentPlan: appraisalCopy.selfAppraisal.developmentPlan || "",
      remarks: appraisalCopy.selfAppraisal.remarks || "",
    };

    // Reset viewing state before setting new data
    setViewingAppraisal(null);
    setTimeout(() => {
      setViewingAppraisal({
        ...appraisalCopy,
        selfAppraisal: formattedData,
      });
      setIsViewModalOpen(true);
    }, 0);
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
                  <p className="font-medium">John Doe</p>
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
                        {currentAppraisal.selfAppraisal
                          ? "Self Appraisal Submitted"
                          : "Self Appraisal Required"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentAppraisal.selfAppraisal
                          ? "You can view your submitted appraisal below."
                          : "Please complete your self appraisal to proceed."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    {currentAppraisal.selfAppraisal ? (
                      <Button
                        variant="outline"
                        onClick={() => handleViewAppraisal(currentAppraisal)}
                      >
                        View Submitted Appraisal
                      </Button>
                    ) : (
                      <Button onClick={() => setIsModalOpen(true)}>
                        Complete Self Appraisal
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
                        {appraisal.rating}/5.0
                      </p>
                    </div>
                  </div>

                  {appraisal.feedback && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">
                        Manager Feedback
                      </p>
                      <p className="text-gray-700">{appraisal.feedback}</p>
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
        />
      )}

      {/* View Submitted Appraisal Modal */}
      {viewingAppraisal && (
        <EmployeeSelfAppraisalModal
          key={`view-modal-${viewingAppraisal.id}`} // Add key to force re-render
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingAppraisal(null); // Clear viewing state on close
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
