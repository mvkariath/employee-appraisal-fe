"use client";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {EmployeeAppraisal } from "@/types/index"; // Adjust the import path as necessary




// Updated badge status color: only allowed shadcn badge variants
const statusColor = {
  "Pending": "destructive",
  "In Progress": "secondary",
  "Completed": "default"
} as const;

export const EmployeeAppraisalsTable = ({ mockAppraisals}  :{ mockAppraisals:EmployeeAppraisal[]}) => {
 

  return (
   <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAppraisals.map((appraisal) => (
              <TableRow key={appraisal.employeeId}>
                <TableCell>{appraisal.employeeName}</TableCell>
                <TableCell>{appraisal.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    appraisal.status === "completed"
                      ? "success"
                      : appraisal.status === "in_progress"
                        ? "secondary"
                        : "outline"
                  }>
                    {appraisal.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{appraisal.progress}%</span>
                    </div>
                    <Progress value={appraisal.progress} />
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => handleViewAppraisal(appraisal.employeeId)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
};