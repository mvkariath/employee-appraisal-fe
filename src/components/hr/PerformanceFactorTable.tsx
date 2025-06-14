import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

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

interface PerformanceFactorsTableProps {
  factors: PerformanceFactorData[];
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

const PerformanceFactorsTable: React.FC<PerformanceFactorsTableProps> = ({
  factors,
}) => {
  if (!factors?.length) return null;
  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Competency</TableHead>
            <TableHead>Strengths</TableHead>
            <TableHead>Areas for Improvement</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {factors.map((pf, idx) => (
            <TableRow key={pf.competency || idx}>
              <TableCell>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {competencyDisplay[pf.competency] || pf.competency}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-pre-line">{pf.strengths}</TableCell>
              <TableCell className="whitespace-pre-line">{pf.improvements}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <Progress className="w-24 h-2" value={pf.rating * 20} />
                  <span className="text-lg font-semibold">{pf.rating}/5</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PerformanceFactorsTable;
