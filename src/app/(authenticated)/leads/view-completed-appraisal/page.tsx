import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import { EmployeeDetailsView } from "@/components/leads/EmployeeDetailsView";
import PerformanceFactorsView from "@/components/leads/PerformanceFactorsView";
import { SelfAppraisalView } from "@/components/leads/SelfAppraisalView";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AppraisalDetailPage() {
  const params=useParams()
  const { appraisal_id }= params.query
  console.log("Appraisal ID:", appraisal_id);

 const {data:completed_appraisal}=useGetAppraisalByIdQuery(appraisal_id)

 

  if (!completed_appraisal) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Appraisal Details - {data.cycle_name}</h1>

      <EmployeeDetailsView employee={completed_appraisal.employee} />
      <SelfAppraisalView selfAppraisal={completed_appraisal.self_appraisal} />
      <PerformanceFactorsView performance_factors={completed_appraisal.performance_factors} />
      {/* <IDPDetails idps={data.idp} /> */}
    </div>
  );
}