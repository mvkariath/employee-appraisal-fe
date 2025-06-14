"use client";

import { EmployeeDetailsView } from "@/components/leads/EmployeeDetailsView";
import { LeadEvaluationForm } from "@/components/leads/LeadEvaluationForm";
import { SelfAppraisalView } from "@/components/leads/SelfAppraisalView";
import { Appraisal, Employee } from "@/types";
import { useParams } from "next/navigation";

const AppraisalPage = () => {
  const params = useParams();
  const employeeId = params.employeeId as string;

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
    leadEvaluation: null,
    status: "Pending Lead-Evaluation",
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Appraisal for {employee.name}
      </h1>
      <div className="space-y-8">
        <EmployeeDetailsView employee={employee} />
        <SelfAppraisalView selfAppraisal={appraisal.selfAppraisal} />
        <LeadEvaluationForm />
      </div>
    </div>
  );
};

export default AppraisalPage;