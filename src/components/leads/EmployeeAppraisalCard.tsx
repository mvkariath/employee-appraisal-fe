"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { EmployeeData } from "@/api-service/leads/types"
import { FileText, User, Video } from "lucide-react"
import { formatDate } from "../functions"

export interface EmployeeAppraisalCardProps {
  appraisal:EmployeeData
} 

export const EmployeeAppraisalCard = ({ appraisal }: EmployeeAppraisalCardProps) => {
  const router = useRouter()





  const getProgressFromStatus = (status: string): number => {
    switch (status) {
      case "NA":
        return 0;
      case "INITIATED":
        return 10;
      case "SELF_APPRAISED":
        return 25;
      case "INITIATE_FEEDBACK":
        return 40;
      case "FEEDBACK_SUBMITTED":
        return 60;
      case "MEETING_DONE":
        return 75;
      case "DONE":
        return 90;
      case "ALL_DONE":
        return 100;
      default:
        return 0;
    }
  };

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
     const handleViewAppraisal = (appraisalId:number,status:string) => {
    if(status==="INITIATE_FEEDBACK" || status==="FEEDBACK_SUBMITTED"){
         router.push(`/leads/appraisal/${appraisalId}`)
    }else if(status==="MEETING_DONE"){
      router.push(`/leads/view-completed-appraisal/${appraisalId}`)
    }
 
  }

return(
   <Card key={appraisal.employee.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {appraisal.employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {appraisal.employee.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appraisal.employee.role} • {appraisal.employee.department}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appraisal.appraisalStatus)}>
                      {appraisal.appraisalStatus}
                    </Badge>
                  </div>
  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      
                      
                      {/* <span className="text-black-500">
                        Email:    {appraisal.employee.email}
                      </span> */}
                      <span className="text-gray-600">
                        Current Status: {appraisal.employee.status}
                      </span>
                      
                    </div>
                      <div className="flex justify-between text-sm">
                      
                      
                      <span className="text-gray-500">
                       Start Date: {formatDate(appraisal.startDate)}
                      </span>
                      <span className="text-black-600-bold">
                       Due Date :{formatDate(appraisal.endDate)}
                      </span>
                      
                    </div>
                    {/* <Progress
                      value={getProgressFromStatus(appraisal.employee.status)}
                      className="h-2"
                    /> */}
                    <div className="h-2"></div>
                    <div className="flex gap-2 flex-wrap" key={appraisal.appraisalId}>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={()=>{handleViewAppraisal(appraisal.appraisalId,appraisal.appraisalStatus)}}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <User className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      
                      {appraisal.appraisalStatus === "FEEDBACK_SUBMITTED" && (
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-blue-600 hover:bg-blue-700"
                      
                        >
                          <Video className="h-4 w-4 mr-1" />
                          Attend Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
)
}

