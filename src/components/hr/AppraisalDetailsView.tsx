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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Mail } from "lucide-react";

type SelfAppraisalData = {
  delivery_details: string;
  accomplishments: string;
  approach_solution: string;
  improvement_possibilities: string;
  project_time_frame: string;
  leads?: { name: string }[];
};

type IDPData = {
  competency: string;
  technical_objective: string;
  technical_plan: string;
}[];

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
  id: number;
  competency: Competency | string;
  strengths: string | null;
  improvements: string | null;
  rating: number;
};

interface AppraisalDetailsViewProps {
  selfAppraisal?: SelfAppraisalData[];
  performanceFactors?: PerformanceFactorData[];
  idp?: IDPData;
  viewingAs?: string;
  onRemindUser?: () => void;
}

const competencyDisplay: Record<string, string> = {
  [Competency.TECHNICAL]: "Technical",
  [Competency.FUNCTIONAL]: "Functional",
  [Competency.COMMUNICATION]: "Communication",
  [Competency.ENERGY_DRIVE]: "Energy & Drive",
  [Competency.RESPONSIBILITY_TRUST]: "Responsibility & Trust",
  [Competency.TEAMWORK]: "Teamwork",
  [Competency.MANAGINGPROCESSES_WORK]: "Managing Processes & Work",
  BEHAVIORAL: "Behavioral", // Added for the IDP data
};

const EmptyState = ({ onRemind }: { onRemind: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg bg-gray-50">
    <FileText className="h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Not Yet Filled</h3>
    <p className="text-gray-500 mb-4 text-center max-w-md">
      This section hasn't been completed by the employee yet.
    </p>
    <Button
      variant="outline"
      onClick={onRemind}
      className="flex items-center gap-2"
    >
      <Mail className="h-4 w-4" />
      Remind the User
    </Button>
  </div>
);

const PerformanceFactorsTable: React.FC<{
  factors: PerformanceFactorData[];
  onRemind?: () => void;
}> = ({ factors, onRemind }) => {
  if (!factors?.length) {
    return <EmptyState onRemind={onRemind || (() => {})} />;
  }

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
              key={pf.id || idx}
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
                {pf.strengths || "-"}
              </TableCell>

              <TableCell className="whitespace-pre-line text-sm text-gray-700">
                {pf.improvements || "-"}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Progress
                    value={pf.rating * 20}
                    className={`w-28 h-2 rounded-full shadow-inner ${
                      pf.rating <= 1
                        ? "bg-red-200 [&>div]:bg-red-500"
                        : pf.rating <= 2
                        ? "bg-orange-200 [&>div]:bg-orange-500"
                        : pf.rating <= 3
                        ? "bg-yellow-200 [&>div]:bg-yellow-500"
                        : pf.rating <= 4
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

const IDPTable: React.FC<{ idp: IDPData; onRemind?: () => void }> = ({
  idp,
  onRemind,
}) => {
  if (!idp?.length) {
    return <EmptyState onRemind={onRemind || (() => {})} />;
  }

  return (
    <div className="overflow-x-auto w-full">
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-800">
            <TableHead className="text-base font-semibold">
              Competency
            </TableHead>
            <TableHead className="text-base font-semibold">Objective</TableHead>
            <TableHead className="text-base font-semibold">Plan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {idp.map((item, idx) => (
            <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
              <TableCell>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                >
                  {competencyDisplay[item.competency] || item.competency}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-700">
                {item.technical_objective || "-"}
              </TableCell>
              <TableCell className="text-sm text-gray-700">
                {item.technical_plan || "-"}
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
  idp,
  viewingAs,
  onRemindUser,
}) => {
  const handleRemindUser = () => {
    toast("Reminder sent to the user to fill out the appraisal form.");
    onRemindUser?.();
  };

  const currentSelfAppraisal = selfAppraisal?.[0];
  const showReminderButton = viewingAs === "HR" || viewingAs === "LEAD";

  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full px-4 sm:px-0 mx-auto ">
      {/* Self Appraisal */}
      <Card className="shadow-none border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
            Employee Self Appraisal
          </h2>
          {showReminderButton && !currentSelfAppraisal && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemindUser}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Remind
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {currentSelfAppraisal ? (
            <div className="overflow-x-auto">
              <Table className="border rounded-lg">
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-base font-semibold text-blue-800 border-r">
                      Delivery Details
                    </TableHead>
                    <TableHead className="text-base font-semibold text-blue-800 border-r">
                      Accomplishments
                    </TableHead>
                    <TableHead className="text-base font-semibold text-blue-800 border-r">
                      Approach
                    </TableHead>
                    <TableHead className="text-base font-semibold text-blue-800 border-r">
                      Improvements
                    </TableHead>
                    <TableHead className="text-base font-semibold text-blue-800">
                      Time Frame
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                      {currentSelfAppraisal.delivery_details}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                      {currentSelfAppraisal.accomplishments}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                      {currentSelfAppraisal.approach_solution}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-sm text-gray-700 border-r align-top min-w-[200px]">
                      {currentSelfAppraisal.improvement_possibilities}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-sm text-gray-700 align-top min-w-[150px]">
                      {currentSelfAppraisal.project_time_frame}
                      {currentSelfAppraisal.leads?.length ? (
                        <div className="mt-2">
                          <strong>Project Leads:</strong>
                          <br />
                          {currentSelfAppraisal.leads
                            .map((lead) => lead.name)
                            .join(", ")}
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState onRemind={handleRemindUser} />
          )}
        </CardContent>
      </Card>

      {/* Performance Factors */}
      <Card className="shadow-none border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
            Performance Factors
          </h2>
          {showReminderButton &&
            (!performanceFactors || performanceFactors.length === 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemindUser}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Remind
              </Button>
            )}
        </CardHeader>
        <CardContent>
          <PerformanceFactorsTable
            factors={performanceFactors || []}
            onRemind={showReminderButton ? handleRemindUser : undefined}
          />
        </CardContent>
      </Card>

      {/* Individual Development Plan */}
      <Card className="shadow-none border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
            Individual Development Plan (IDP)
          </h2>
          {showReminderButton && (!idp || idp.length === 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemindUser}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Remind
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <IDPTable
            idp={idp || []}
            onRemind={showReminderButton ? handleRemindUser : undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalDetailsView;
