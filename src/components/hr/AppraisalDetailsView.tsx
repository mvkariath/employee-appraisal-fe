import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PerformanceFactorsTable from "./PerformanceFactorTable";
import { Competency } from "./PerformanceFactorTable";

type SelfAppraisalData = {
  delivery_details: string;
  accomplishments: string;
  approach_solution: string;
  improvement_possibilities: string;
  project_time_frame: string;
  leads: string[]
};

type PerformanceFactorData = {
  competency: Competency;
  strengths: string;
  improvements: string;
  rating: number;
};

interface AppraisalDetailsViewProps {
  selfAppraisal: SelfAppraisalData;
  performanceFactors: PerformanceFactorData[];
}

const labelClass =
  "block font-medium text-sm sm:text-base text-muted-foreground mb-1";
const valueClass =
  "mb-4 rounded border bg-muted px-3 sm:px-4 py-2 whitespace-pre-line text-sm sm:text-base";

const AppraisalDetailsView: React.FC<AppraisalDetailsViewProps> = ({
  selfAppraisal,
  performanceFactors,
}) => (
  <div className="flex flex-col gap-6 sm:gap-8 w-full px-4 sm:px-0 mx-auto">
    {/* Self Appraisal Entry */}
    <Card className="shadow-none border">
      <CardHeader>
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
          Self Appraisal Entry
        </h2>
      </CardHeader>
      <CardContent>
        <div>
          <label className={labelClass}>Delivery Details</label>
          <div className={valueClass}>{selfAppraisal.delivery_details}</div>

          <label className={labelClass}>Accomplishments</label>
          <div className={valueClass}>{selfAppraisal.accomplishments}</div>

          <label className={labelClass}>Approach & Solution</label>
          <div className={valueClass}>{selfAppraisal.approach_solution}</div>

          <label className={labelClass}>Improvement Possibilities</label>
          <div className={valueClass}>
            {selfAppraisal.improvement_possibilities}
          </div>

          <label className={labelClass}>Project Time Frame</label>
          <div className={valueClass}>{selfAppraisal.project_time_frame}</div>


          <label className={labelClass}>Project Leads</label>
          <div className={valueClass}>{selfAppraisal.leads}</div>
        </div>
      </CardContent>
    </Card>

    {/* Performance Factors Table */}
    <div className="border rounded-lg p-4 sm:p-6 bg-white">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-4">
        Performance Factors
      </h2>
      <div className="overflow-x-auto">
        <PerformanceFactorsTable factors={performanceFactors} />
      </div>
    </div>
  </div>
);

export default AppraisalDetailsView;
