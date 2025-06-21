"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/api-service/employees/types";
import { formatDate } from "../functions";


export const EmployeeDetailsView = ({ employee }: {employee:Employee}) => {
  return (  
  <Card className="bg-gradient-to-r from-blue-400 to-blue-200 text-white">
      <CardHeader>
        <CardTitle className="font-bold"> Employee Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name</p>
            <p>{employee.name}</p>
          </div>
          <div>
            <p className="font-semibold">Designation</p>
            <p>{employee.role}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Joining</p>
            <p>{formatDate(employee.dateOfJoining)}</p>
          </div>
          <div>
            <p className="font-semibold">Years of Experience</p>
            <p>{employee.experience}</p>
          </div>
          <div>
            <p className="font-semibold">Team</p>
            <p>{employee.department}</p>
          </div>
          {/* <div>
            <p className="font-semibold">Team Leads</p>
            <p>{employee.teamLeads.join(", ")}</p>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};