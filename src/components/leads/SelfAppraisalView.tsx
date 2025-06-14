"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SelfAppraisalEntry } from "@/types";

interface SelfAppraisalViewProps {
  selfAppraisal: SelfAppraisalEntry[];
}

export const SelfAppraisalView = ({ selfAppraisal }: SelfAppraisalViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Self-Appraisal</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Delivery Details</TableHead>
              <TableHead>Accomplishments</TableHead>
              <TableHead>Approach/Solution</TableHead>
              <TableHead>Improvement Possibilities</TableHead>
              <TableHead>Strengths</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selfAppraisal.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.deliveryDetails}</TableCell>
                <TableCell>{entry.accomplishments}</TableCell>
                <TableCell>{entry.approach}</TableCell>
                <TableCell>{entry.improvements}</TableCell>
                <TableCell>{entry.strengths}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};