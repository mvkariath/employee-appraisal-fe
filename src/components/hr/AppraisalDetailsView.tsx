import React from "react";
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
import { cn } from "@/lib/utils";

// --- TYPE DEFINITIONS (from your original code) ---
export enum Competency {
  TECHNICAL = "TECHNICAL",
  FUNCTIONAL = "FUNCTIONAL",
  COMMUNICATION = "COMMUNICATION",
  ENERGY_DRIVE = "ENERGY & DRIVE",
  RESPONSIBILITY_TRUST = "RESPONSIBILITY & TRUST",
  TEAMWORK = "TEAMWORK",
  MANAGINGPROCESSES_WORK = "MANAGING PROCESSES & WORK",
}

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
  showIdpSection?: boolean; // From previous step, good to keep
}

// --- STYLING HELPERS & COMPONENTS ---

const competencyDisplay: Record<string, string> = {
  [Competency.TECHNICAL]: "Technical",
  [Competency.FUNCTIONAL]: "Functional",
  [Competency.COMMUNICATION]: "Communication",
  [Competency.ENERGY_DRIVE]: "Energy & Drive",
  [Competency.RESPONSIBILITY_TRUST]: "Responsibility & Trust",
  [Competency.TEAMWORK]: "Teamwork",
  [Competency.MANAGINGPROCESSES_WORK]: "Managing Processes & Work",
  BEHAVIORAL: "Behavioral",
};

const getRatingColor = (rating: number) => {
  if (rating <= 1) return { track: "bg-red-500/10", indicator: "bg-red-400" };
  if (rating <= 2)
    return { track: "bg-orange-500/10", indicator: "bg-orange-400" };
  if (rating <= 3)
    return { track: "bg-yellow-500/10", indicator: "bg-yellow-400" };
  if (rating <= 4) return { track: "bg-blue-500/10", indicator: "bg-blue-400" };
  return { track: "bg-green-500/10", indicator: "bg-green-400" };
};

const EmptyState = ({ onRemind }: { onRemind: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-black/20 border border-dashed border-white/20 rounded-xl">
    <FileText className="h-10 w-10 text-white/40 mb-4" />
    <h3 className="text-lg font-semibold text-white mb-1">Not Yet Filled</h3>
    <p className="text-white/60 mb-6 max-w-sm">
      This section hasn't been completed by the employee yet. You can send a
      friendly reminder.
    </p>
    <Button
      variant="secondary"
      onClick={onRemind}
      className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white rounded-lg gap-2"
    >
      <Mail className="h-4 w-4" />
      Remind User
    </Button>
  </div>
);

const SectionWrapper: React.FC<{
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, children, action }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

const PerformanceFactorsTable: React.FC<{
  factors: PerformanceFactorData[];
}> = ({ factors }) => (
  <div className="overflow-x-auto w-full bg-white/5 border border-white/10 rounded-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-b-white/10 hover:bg-transparent">
          <TableHead className="font-semibold text-white/80">
            Competency
          </TableHead>
          <TableHead className="font-semibold text-white/80">
            Strengths
          </TableHead>
          <TableHead className="font-semibold text-white/80">
            Areas for Improvement
          </TableHead>
          <TableHead className="font-semibold text-white/80">Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {factors.map((pf, idx) => {
          const ratingColors = getRatingColor(pf.rating);
          return (
            <TableRow
              key={pf.id || idx}
              className="border-b-white/10 hover:bg-white/5"
            >
              <TableCell>
                <Badge className="bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                  {competencyDisplay[pf.competency] || pf.competency}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-pre-line text-white/90">
                {pf.strengths || "—"}
              </TableCell>
              <TableCell className="whitespace-pre-line text-white/90">
                {pf.improvements || "—"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 min-w-[150px]">
                  <Progress
                    value={pf.rating * 20}
                    className={cn("w-24 h-2 rounded-full", ratingColors.track)}
                  />
                  <span className="text-sm font-semibold text-white">
                    {pf.rating}/5
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

const IDPTable: React.FC<{ idp: IDPData }> = ({ idp }) => (
  <div className="overflow-x-auto w-full bg-white/5 border border-white/10 rounded-xl">
    <Table>
      <TableHeader>
        <TableRow className="border-b-white/10 hover:bg-transparent">
          <TableHead className="font-semibold text-white/80">
            Competency
          </TableHead>
          <TableHead className="font-semibold text-white/80">
            Objective
          </TableHead>
          <TableHead className="font-semibold text-white/80">Plan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {idp.map((item, idx) => (
          <TableRow key={idx} className="border-b-white/10 hover:bg-white/5">
            <TableCell>
              <Badge className="bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                {competencyDisplay[item.competency] || item.competency}
              </Badge>
            </TableCell>
            <TableCell className="text-white/90">
              {item.technical_objective || "—"}
            </TableCell>
            <TableCell className="text-white/90">
              {item.technical_plan || "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// --- MAIN COMPONENT ---
const AppraisalDetailsView: React.FC<AppraisalDetailsViewProps> = ({
  selfAppraisal,
  performanceFactors,
  idp,
  viewingAs,
  onRemindUser,
  showIdpSection = true, // Default to true if not provided
}) => {
  const handleRemindUser = () => {
    toast.success("Reminder sent to the user!");
    onRemindUser?.();
  };

  const canRemind = viewingAs === "HR" || viewingAs === "LEAD";
  const selfAppraisalData = selfAppraisal || [];

  const RemindButton = () => (
    <Button
      variant="primary"
      size="sm"
      onClick={handleRemindUser}
      className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white rounded-lg gap-2"
    >
      <Mail className="h-4 w-4" /> Remind
    </Button>
  );

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Self Appraisal Section */}
      <SectionWrapper
        title="Employee Self Appraisal"
        action={
          canRemind && selfAppraisalData.length === 0 ? <RemindButton /> : null
        }
      >
        {selfAppraisalData.length > 0 ? (
          <div className="overflow-x-auto w-full bg-white/5 border border-white/10 rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="border-b-white/10 hover:bg-transparent">
                  <TableHead className="font-semibold text-white/80">
                    Delivery Details
                  </TableHead>
                  <TableHead className="font-semibold text-white/80">
                    Accomplishments
                  </TableHead>
                  <TableHead className="font-semibold text-white/80">
                    Approach
                  </TableHead>
                  <TableHead className="font-semibold text-white/80">
                    Improvements
                  </TableHead>
                  <TableHead className="font-semibold text-white/80">
                    Time Frame
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selfAppraisalData.map((entry, idx) => (
                  <TableRow
                    key={idx}
                    className="border-b-white/10 hover:bg-white/5"
                  >
                    <TableCell className="whitespace-pre-line text-white/90 align-top font-semibold">
                      {entry.delivery_details}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-white/90 align-top">
                      {entry.accomplishments}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-white/90 align-top">
                      {entry.approach_solution}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-white/90 align-top">
                      {entry.improvement_possibilities}
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-white/90 align-top">
                      {entry.project_time_frame}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState onRemind={handleRemindUser} />
        )}
      </SectionWrapper>

      {/* Performance Factors Section */}
      <SectionWrapper
        title="Performance Factors"
        action={
          canRemind &&
          (!performanceFactors || performanceFactors.length === 0) ? (
            <RemindButton />
          ) : null
        }
      >
        {!performanceFactors || performanceFactors.length === 0 ? (
          <EmptyState onRemind={handleRemindUser} />
        ) : (
          <PerformanceFactorsTable factors={performanceFactors} />
        )}
      </SectionWrapper>

      {/* Individual Development Plan Section */}
      {showIdpSection && (
        <SectionWrapper
          title="Individual Development Plan (IDP)"
          action={
            canRemind && (!idp || idp.length === 0) ? <RemindButton /> : null
          }
        >
          {!idp || idp.length === 0 ? (
            <EmptyState onRemind={handleRemindUser} />
          ) : (
            <IDPTable idp={idp} />
          )}
        </SectionWrapper>
      )}
    </div>
  );
};

export default AppraisalDetailsView;
