"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types";

interface EmployeeDetailsViewProps {
  employee: Employee;
}

export const EmployeeDetailsView = ({ employee }: EmployeeDetailsViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name</p>
            <p>{employee.name}</p>
          </div>
          <div>
            <p className="font-semibold">Designation</p>
            <p>{employee.designation}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Joining</p>
            <p>{employee.dateOfJoining}</p>
          </div>
          <div>
            <p className="font-semibold">Years of Experience</p>
            <p>{employee.yearsOfExperience}</p>
          </div>
          <div>
            <p className="font-semibold">Team</p>
            <p>{employee.team}</p>
          </div>
          <div>
            <p className="font-semibold">Team Leads</p>
            <p>{employee.teamLeads.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};