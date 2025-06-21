"use client";

import { useParams } from "next/navigation";
import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useGetEmployeeByIdQuery } from "@/api-service/employees/employee.api";
import { useGetPastAppraisalByEmployeeIdQuery } from "@/api-service/leads/leads.api";
import CycleDetails from "@/components/leads/CycleDetails";
import { EmployeeDetailsView } from "@/components/leads/EmployeeDetailsView";
import PerformanceFactorsView from "@/components/leads/PerformanceFactorsView";
import { SelfAppraisalView } from "@/components/leads/SelfAppraisalView";
import { useMemo } from "react";
import IndividualDevelopmentPlanCard from "@/components/leads/IndividualDevelopmentPlanCard";

export default function AppraisalDetailPage() {
  const params = useParams();
  const appraisalId = Number(params?.appraisal_id);

  const {
    data: completed_appraisal,
    isLoading: isLoadingAppraisal,
  } = useGetAppraisalByIdQuery({ id: appraisalId }, { skip: !appraisalId });

  const {
    data: employeeData,
    isLoading: isLoadingEmployee,
  } = useGetEmployeeByIdQuery(
    { id: completed_appraisal?.employee?.id },
    { skip: !completed_appraisal?.employee?.id }
  );

  const {
    data: pastAppraisalsData,
    isLoading: isLoadingPast,
  } = useGetPastAppraisalByEmployeeIdQuery(
    { id: completed_appraisal?.employee?.id },
    { skip: !completed_appraisal?.employee?.id }
  );

  const currentCycle = useMemo(() => {
    if (!pastAppraisalsData) return null;
    return pastAppraisalsData.find((a) => a.id === appraisalId);
  }, [pastAppraisalsData, appraisalId]);

  const isLoading =
    isLoadingAppraisal ||
    isLoadingEmployee ||
    isLoadingPast ||
    !completed_appraisal ||
    !currentCycle;

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Appraisal Details - {completed_appraisal?.cycle_name}
      </h1>

      <CycleDetails cycle={currentCycle} />
      <EmployeeDetailsView employee={employeeData} />
      <SelfAppraisalView selfAppraisal={completed_appraisal?.self_appraisal} />
      <PerformanceFactorsView performance_factors={completed_appraisal?.performance_factors} />
      <IndividualDevelopmentPlanCard idpData={completed_appraisal?.idp} />
    </div>
  );
}
