"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SelfAppraisalEntry } from "@/api-service/leads/types"; 

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
              <TableHead>Project Time Frame</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selfAppraisal.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.delivery_details}</TableCell>
                <TableCell>{entry.accomplishments}</TableCell>
                <TableCell>{entry.approach_solution}</TableCell>
                <TableCell>{entry.improvement_possibilities}</TableCell>
                <TableCell>{entry.project_time_frame}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};