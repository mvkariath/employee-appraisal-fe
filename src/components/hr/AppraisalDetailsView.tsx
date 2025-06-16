import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type SelfAppraisalData = {
  delivery_details: string;
  accomplishments: string;
  approach_solution: string;
  improvement_possibilities: string;
  project_time_frame: string;
  leads: string[];
};

export enum Competency {
  TECHNICAL = "TECHNICAL",
  FUNCTIONAL = "FUNCTIONAL",
  COMMUNICATION = "COMMUNICATION",
  ENERGY_DRIVE = "ENERGY & DRIVE",
  RESPONSIBILITY_TRUST = "RESPONSIBILITY & TRUST",
  TEAMWORK = "TEAMWORK",
  MANAGINGPROCESSES_WORK = "MANAGING PROCESSES & WORK",
}

export type PerformanceFactorData = {
  competency: Competency;
  strengths: string;
  improvements: string;
  rating: number;
};

interface AppraisalDetailsViewProps {
  selfAppraisal: SelfAppraisalData;
  performanceFactors: PerformanceFactorData[];
}

const competencyDisplay: Record<Competency, string> = {
  [Competency.TECHNICAL]: "Technical",
  [Competency.FUNCTIONAL]: "Functional",
  [Competency.COMMUNICATION]: "Communication",
  [Competency.ENERGY_DRIVE]: "Energy & Drive",
  [Competency.RESPONSIBILITY_TRUST]: "Responsibility & Trust",
  [Competency.TEAMWORK]: "Teamwork",
  [Competency.MANAGINGPROCESSES_WORK]: "Managing Processes & Work",
};

const PerformanceFactorsTable: React.FC<{
  factors: PerformanceFactorData[];
}> = ({ factors }) => {
  if (!factors?.length) return null;

  return (
    <div className="overflow-x-auto w-full">
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-800">
            <TableHead className="text-base font-semibold">
              Competency
            </TableHead>
            <TableHead className="text-base font-semibold">Strengths</TableHead>
            <TableHead className="text-base font-semibold">
              Areas for Improvement
            </TableHead>
            <TableHead className="text-base font-semibold">Rating</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {factors.map((pf, idx) => (
            <TableRow
              key={pf.competency || idx}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell>
                <Badge
                  variant="secondary"
                  className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                >
                  {competencyDisplay[pf.competency] || pf.competency}
                </Badge>
              </TableCell>

              <TableCell className="whitespace-pre-line text-sm text-gray-700">
                {pf.strengths}
              </TableCell>

              <TableCell className="whitespace-pre-line text-sm text-gray-700">
                {pf.improvements}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Progress
                    value={pf.rating * 20}
                    className={`w-28 h-2 rounded-full shadow-inner ${
                      pf.rating === 1
                        ? "bg-red-200 [&>div]:bg-red-500"
                        : pf.rating === 2
                        ? "bg-orange-200 [&>div]:bg-orange-500"
                        : pf.rating === 3
                        ? "bg-yellow-200 [&>div]:bg-yellow-500"
                        : pf.rating === 4
                        ? "bg-blue-200 [&>div]:bg-blue-500"
                        : "bg-green-200 [&>div]:bg-green-500"
                    }`}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {pf.rating}/5
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const AppraisalDetailsView: React.FC<AppraisalDetailsViewProps> = ({
  selfAppraisal,
  performanceFactors,
}) => {
  // Sample data for demonstration
  const sampleSelfAppraisal = {
    delivery_details:
      "Delivered phase 1 of the mobile app successfully within the agreed timeline, collaborating cross-functionally.",
    accomplishments:
      "Implemented new authentication flow, reduced load time by 30%, mentored two junior developers.",
    approach_solution:
      "Adopted agile sprints, established daily syncs to align teams, and proactively addressed blockers.",
    improvement_possibilities:
      "Could have conducted more user testing before release. Plan to involve QA earlier in the next cycle.",
    project_time_frame: "January 2024 - March 2024",
    leads: ["David Lopez"],
  };

  const samplePerformanceFactors = [
    {
      competency: Competency.TECHNICAL,
      strengths:
        "Strong problem-solving skills, proficient in React and Node.js",
      improvements: "Could improve knowledge of cloud architecture",
      rating: 4,
    },
    {
      competency: Competency.COMMUNICATION,
      strengths: "Clear in explaining complex concepts, good listener",
      improvements: "Could be more proactive in team meetings",
      rating: 4,
    },
    {
      competency: Competency.TEAMWORK,
      strengths: "Collaborative, supports team members effectively",
      improvements: "Could take more leadership initiatives",
      rating: 5,
    },
  ];

  const dataToUse = selfAppraisal || sampleSelfAppraisal;
  const factorsToUse = performanceFactors || samplePerformanceFactors;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full px-4 sm:px-0 mx-auto">
      {/* Self Appraisal Entry - Table Format */}
      <Card className="shadow-none border">
        <CardHeader>
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black-600">
            Employee Self Appraisal
          </h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border rounded-lg">
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-base font-semibold text-blue-800 border-r">
                    Delivery Details
                  </TableHead>
                  <TableHead className="text-base font-semibold text-blue-800 border-r">
                    Highlight of Accomplishments
                  </TableHead>
                  <TableHead className="text-base font-semibold text-blue-800 border-r">
                    Approach / Solution taken
                  </TableHead>
                  <TableHead className="text-base font-semibold text-blue-800 border-r">
                    Improvement possibilities
                  </TableHead>
                  <TableHead className="text-base font-semibold text-blue-800">
                    Time frame of the project/Job
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                    {dataToUse.delivery_details}
                  </TableCell>
                  <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                    {dataToUse.accomplishments}
                  </TableCell>
                  <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                    {dataToUse.approach_solution}
                  </TableCell>
                  <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                    {dataToUse.improvement_possibilities}
                  </TableCell>
                  <TableCell className="whitespace-pre-line text-sm text-gray-700 align-top min-w-[150px]">
                    {dataToUse.project_time_frame}
                    {dataToUse.leads && dataToUse.leads.length > 0 && (
                      <div className="mt-2">
                        <strong>Project Leads:</strong>
                        <br />
                        {Array.isArray(dataToUse.leads)
                          ? dataToUse.leads.join(", ")
                          : dataToUse.leads}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Factors Table */}
      <div className="border rounded-lg p-4 sm:p-6 bg-white">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-4">
          Performance Factors
        </h2>
        <div className="overflow-x-auto">
          <PerformanceFactorsTable factors={factorsToUse} />
        </div>
      </div>
    </div>
  );
};

export default AppraisalDetailsView;
