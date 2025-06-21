"use client";

import { Label } from "@/components/ui/label";

interface EmployeeData {
  name: string;
  designation: string;
  employeeNumber: string;
}

interface Props {
  employeeData: EmployeeData;
}

export default function EmployeeDetails({ employeeData }: Props) {
  return (
    <>
      <div>
        <Label className="text-gray-500">Employee Name</Label>
        <p className="font-medium">{employeeData.name}</p>
      </div>
      <div>
        <Label className="text-gray-500">Department</Label>
        <p className="font-medium">{employeeData.designation}</p>
      </div>
      <div>
        <Label className="text-gray-500">Employee Number</Label>
        <p className="font-medium">{employeeData.employeeNumber}</p>
      </div>
    </>
  );
}
