"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PastAppraisalSummary } from "@/types";

interface PastAppraisalsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pastAppraisals: PastAppraisalSummary[];
}

export const PastAppraisalsModal = ({
  open,
  onOpenChange,
  pastAppraisals,
}: PastAppraisalsModalProps) => {
  const handleSelectAppraisal = (appraisalId: string) => {
    // Open in new window
    window.open(`/appraisal/${appraisalId}?past=true`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Past Appraisals</DialogTitle>
          <DialogDescription>
            Select a past appraisal to view its details in a new window.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Lead</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastAppraisals.map((appraisal) => (
              <TableRow
                key={appraisal.id}
                onClick={() => handleSelectAppraisal(appraisal.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>
                  {appraisal.period.from} - {appraisal.period.to}
                </TableCell>
                <TableCell>{appraisal.team}</TableCell>
                <TableCell>{appraisal.designation}</TableCell>
                <TableCell>{appraisal.lead}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};