"use client";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {EmployeeAppraisal } from "@/types/index"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import { use } from "react";
import { EmployeeData } from "@/api-service/leads/types";
import { formatDate } from "../functions";



// Updated badge status color: only allowed shadcn badge variants
const statusColor = {
  "Pending": "destructive",
  "In Progress": "secondary",
  "Completed": "default"
} as const;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NA":
        return "bg-red-100 text-red-800";
      case "INITIATED":
        return "bg-red-100 text-red-800";
      case "SELF_APPRAISED":
        return "bg-blue-100 text-blue-800";
      case "INITIATE_FEEDBACK":
        return "bg-gray-100 text-gray-800";
      case "FEEDBACK_SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "MEETING_DONE":
        return "bg-yellow-100 text-yellow-800";
      case "DONE":
        return "bg-purple-100 text-purple-800";
      case "ALL_DONE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
export const EmployeeAppraisalsTable = ({ appraisals}  :{ appraisals:EmployeeData[]|undefined}) => {
  const router=useRouter();
   const handleViewAppraisal = (appraisalId:number,status:string) => {
    if(status==="FEEDBACK_INITIATED" || status==="FEEDBACK_SUBMITTED"){
         router.push(`/leads/appraisal/${appraisalId}`)
    }else if(status==="MEETING_DONE"){
      router.push(`/leads/view-completed-appraisal/${appraisalId}`)
    }
 
  }

  return (
   <Table >
<TableHeader>
  <TableRow>
    <TableHead className="text-white">Name</TableHead>
    <TableHead className="text-white">Team</TableHead>
    <TableHead className="text-white">Name</TableHead>
    <TableHead className="text-white">Role</TableHead>
    <TableHead className="text-white">Status</TableHead>
    <TableHead className="text-white">Start date</TableHead>
    <TableHead className="text-white">Due Date</TableHead>
  </TableRow>
</TableHeader>
          <TableBody>
            {appraisals?.map((appraisal:EmployeeData) => (
              <TableRow key={appraisal.appraisalId}>
                <TableCell>{appraisal.employee.name}</TableCell>
                <TableCell>{appraisal.employee.department}</TableCell>
              
               <TableCell>
                 {appraisal.employee.role} 
               </TableCell>
                 <TableCell>
                    <Badge className={getStatusColor(appraisal.appraisalStatus)}>
                      {appraisal.appraisalStatus}
                    </Badge>
                </TableCell>
               <TableCell>
              {formatDate(appraisal.startDate)}
              
                             
               </TableCell>
               <TableCell>  {formatDate(appraisal.endDate)}</TableCell>
                <TableCell>
                  <Button size="sm" className="bg-white text-black" onClick={() => handleViewAppraisal(appraisal.appraisalId,appraisal.appraisalStatus)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
};