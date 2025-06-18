"use client";

import { EmployeeDetailsView } from "@/components/leads/EmployeeDetailsView";
import IndividualDevelopmentPlan from "@/components/leads/IndividualDevelopmentPlan";
import { LeadEvaluationForm } from "@/components/leads/LeadEvaluationForm";
import { SelfAppraisalView } from "@/components/leads/SelfAppraisalView";
import { Appraisal, Employee, PastAppraisalSummary } from "@/types";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PastAppraisalsModal } from "@/components/leads/PastAppraisalsModal";
import { use, useState } from "react";
import { produce } from "immer";
import { useGetAppraisalByIdQuery } from "@/api-service/leads/leads.api";
import { useGetEmployeeByIdQuery } from "@/api-service/employees/employee.api";
import { useUpdatePerformanceFactorMutation } from "@/api-service/leads/leads.api";
const AppraisalPage = () => {
  const params = useParams();
  const id = params.appraisald as string;
  const {
    data,
    isLoading: isLoadingAppraisal,
    isError,
    error,
  } = useGetAppraisalByIdQuery({ id: id });
  const { data: employee, isLoading: isLoadingEmployee } =
    useGetEmployeeByIdQuery({ id: data?.employee.id });
  const selfAppraisal = data?.self_appraisal;
  const visible_fields = data?.visible_fields || [];
  const competencies = [
    "TECHNICAL",
    "FUNCTIONAL",
    "COMMUNICATION",
    "ENERGY & DRIVE",
    "RESPONSIBILITY & TRUST",
    "TEAMWORK",
    "MANAGING PROCESSES & WORK",
  ];
  const performance_factors =
    data?.performance_factors ||
    competencies.map((c) => ({
      competency: c,
      strengths: "",
      improvements: "",
      rating: 5,
    }));

  const [evaluations, setEvaluations] = useState(() =>
    performance_factors.map(({ id, ...rest }) => rest)
  );

  //   const handleChange = (index: number, field: string, value: any) => {
  //     const updated = [...evaluations]
  //     updated[index][field] = value
  //     setEvaluations(updated)
  //   }
  const [createPerformanceFactor, { isLoading: isUpdating }] =
    useUpdatePerformanceFactorMutation();
  const handleSubmitPerformanceFactor = async () => {
    console.log("Submit clicked");
    console.log("Evaluations:", evaluations);
    console.log(id);
    await createPerformanceFactor({
      id: Number(id),
      performance_factors: evaluations,
    })
      .unwrap()
      .then(() => {
        console.log("Sucesss");
      })
      .catch((e) => {
        console.error("Error updating performance factors:", e);
        alert("Failed to update performance factors. Please try again.");
      });
  };

  const handleChange = (index: number, field: string, value: any) => {
    setEvaluations((prev) =>
      produce(prev, (draft) => {
        draft[index][field] = value;
      })
    );
  };
  if (isLoadingAppraisal || isLoadingEmployee) {
    return <div>Loading...</div>;
  }
  if (isError && error?.status === 403) {
    return (
      <div className="text-red-500 font-semibold">
        🚫 You can't access this data.
      </div>
    );
  }

  // Handle other errors
  if (isError) {
    return (
      <div className="text-red-500 font-semibold">❌ Something went wrong.</div>
    );
  }

  // If data is available
  if (!data) {
    return <div>No data found</div>;
  }
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Appraisal for {employee?.name}
      </h1>

      <div className="space-y-8">
        <EmployeeDetailsView employee={employee} />
        {visible_fields.includes("self_appraisal") && (
          <SelfAppraisalView selfAppraisal={selfAppraisal} />
        )}
        {visible_fields.includes("performance_factors") && (
          <LeadEvaluationForm
            evaluations={evaluations}
            onChange={handleChange}
          />
        )}
        {visible_fields.includes("individual_development_plans") && (
          <IndividualDevelopmentPlan />
        )}

        {/* Button Section */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center mt-2">
              {/* <Button
              variant="outline"
              onClick={() => setIsPastAppraisalsOpen(true)}
            >
              View Past Appraisals
            </Button> */}

              <div className="flex space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={handleSubmitPerformanceFactor}>
                  Submit Evaluation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Appraisals Modal */}
      {/* <PastAppraisalsModal
      open={isPastAppraisalsOpen}
      onOpenChange={setIsPastAppraisalsOpen}
        pastAppraisals={pastAppraisals}
    /> */}
    </div>
  );
};

export default AppraisalPage;
