"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EmployeeAppraisalCardProps {
  appraisal: {
    employeeId: string;
    employeeName: string;
    dueDate: string;
    progress: number;
  };
}

export const EmployeeAppraisalCard = ({ appraisal }: EmployeeAppraisalCardProps) => {
  const router = useRouter();

  const handleViewAppraisal = () => {
    router.push(`/leads/appraisal/${appraisal.employeeId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{appraisal.employeeName}</CardTitle>
        <CardDescription>Due: {appraisal.dueDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{appraisal.progress}%</span>
          </div>
          <Progress value={appraisal.progress} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleViewAppraisal} className="w-full">View Appraisal</Button>
      </CardFooter>
    </Card>
  );
};