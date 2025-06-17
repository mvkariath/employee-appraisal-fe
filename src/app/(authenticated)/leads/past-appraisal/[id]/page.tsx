"use client";

import { EmployeeDetailsView } from "@/components/leads/EmployeeDetailsView";
import { SelfAppraisalView } from "@/components/leads/SelfAppraisalView";
import { LeadEvaluationForm } from "@/components/leads/LeadEvaluationForm";
import IndividualDevelopmentPlan from "@/components/leads/IndividualDevelopmentPlan";
import { Appraisal, Employee, PastAppraisalSummary } from "@/types";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PastAppraisalsModal } from "@/components/leads/PastAppraisalsModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AppraisalSubmittedPage = () => {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const [isPastAppraisalsOpen, setIsPastAppraisalsOpen] = useState(false);

  // Mock data - replace with actual data from your API
  const employee: Employee = {
    id: employeeId,
    name: "Sarah Johnson",
    dateOfJoining: "2020-01-15",
    yearsOfExperience: 4,
    phone: "123-456-7890",
    designation: "Senior Developer",
    team: "Frontend",
    teamLeads: ["Mike Chen"],
  };

  const appraisal: Appraisal = {
    id: "appraisal-1",
    employeeId: employeeId,
    period: { from: "2024-01-01", to: "2024-06-30" },
    selfAppraisal: [
      {
        id: "sa-1",
        deliveryDetails: "Launched the new dashboard feature.",
        accomplishments: "Improved page load speed by 20%.",
        approach: "Used lazy loading for components.",
        improvements: "Could improve code splitting.",
        strengths: "Strong problem-solving skills.",
      },
    ],
    status: "Pending Lead-Evaluation",

    leadEvaluation: {
      technical: {
        strengths: "Strong knowledge of React and TypeScript.",
        improvements: "Could improve testing coverage.",
        rating: 9,
      },
      functional: {
        strengths: "Understands project requirements deeply.",
        improvements: "Needs to write better documentation.",
        rating: 8,
      },
      communication: {
        strengths: "Clear and concise communication.",
        improvements: "Needs to listen more in meetings.",
        rating: 7,
      },
      energyAndDrive: {
        strengths: "Always eager to pick up new tasks.",
        improvements: "Can sometimes burn out from overwork.",
        rating: 8,
      },
      responsibilitiesAndTrust: {
        strengths: "Takes ownership of deliverables.",
        improvements: "Could share workload better.",
        rating: 7,
      },
      teamwork: {
        strengths: "Works well in team settings.",
        improvements: "Needs to help onboard new members.",
        rating: 8,
      },
      managingProcesses: {
        strengths: "Keeps timelines in check.",
        improvements: "Could automate some recurring tasks.",
        rating: 7,
      },
    },
  };

  const pastAppraisals: PastAppraisalSummary[] = [
    {
      id: "past-1",
      team: "Frontend",
      designation: "Junior Developer",
      lead: "Mike Chen",
      period: { from: "2023-07-01", to: "2023-12-31" },
    },
    {
      id: "past-2",
      team: "Frontend",
      designation: "Intern",
      lead: "Mike Chen",
      period: { from: "2023-01-01", to: "2023-06-30" },
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Appraisal Summary for {employee.name}
      </h1>

      <div className="space-y-8">
        <EmployeeDetailsView employee={employee} />
        <SelfAppraisalView selfAppraisal={appraisal.selfAppraisal} />
        {/* <LeadEvaluationForm leadEvaluation={appraisal.leadEvaluation} /> */}
        <IndividualDevelopmentPlan readOnly />

        {/* <Card>
          <CardContent>
            <div className="flex justify-between items-center mt-2">
              <Button
                variant="outline"
                onClick={() => setIsPastAppraisalsOpen(true)}
              >
                View Past Appraisals
              </Button>
              <span className="text-green-700 font-semibold">
                Status: {appraisal.status}
              </span>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <PastAppraisalsModal
        open={isPastAppraisalsOpen}
        onOpenChange={setIsPastAppraisalsOpen}
        pastAppraisals={pastAppraisals}
      />
    </div>
  );
};

export default AppraisalSubmittedPage;
