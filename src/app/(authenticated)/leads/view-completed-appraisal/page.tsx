import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AppraisalDetailPage() {
  const params=useParams()
  const { appraisal_id }= params.query

 const {data:completed_appraisal}=useGetAppraisalByIdQuery(appraisal_id)

 

  if (!completed_appraisal) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Appraisal Details - {data.cycle_name}</h1>

      {/* <EmployeeDetails employee={completed_appraisal.employee} />
      <SelfAppraisalDetails appraisals={completed_appraisalself_appraisal} />
      <PerformanceFactors factors={completed_appraisal.performance_factors} /> */}
      {/* <IDPDetails idps={data.idp} /> */}
    </div>
  );
}