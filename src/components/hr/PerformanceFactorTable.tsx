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
      <Table className="border rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-800">
            <TableHead className="text-base font-semibold">Competency</TableHead>
            <TableHead className="text-base font-semibold">Strengths</TableHead>
            <TableHead className="text-base font-semibold">Areas for Improvement</TableHead>
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
                    className={`w-28 h-2 rounded-full shadow-inner ${pf.rating === 1
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
                  <span className="text-sm font-medium text-gray-800">{pf.rating}/5</span>
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
