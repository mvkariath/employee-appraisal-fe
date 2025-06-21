"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { EmployeeData } from "@/api-service/leads/types"
import { FileText, User, Video } from "lucide-react"

export interface EmployeeAppraisalCardProps {
  appraisal:EmployeeData
} 

export const EmployeeAppraisalCard = ({ appraisal }: EmployeeAppraisalCardProps) => {
  const router = useRouter()

  const handleViewAppraisal = () => {
    router.push(`/leads/appraisal/${appraisal.appraisalId}`)
  }

  function moment(endDate: Date) {
    throw new Error("Function not implemented.")
  }

//   return (
 
//     <Card   key={appraisal.appraisalId}
//               className="hover:shadow-lg transition-shadow">
    
//     <CardContent className="p-6">
//  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold"> {appraisal.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}</div>
//                         <h3 className="font-semibold text-gray-900">
//                         {appraisal.name}
//                       </h3>
//     </CardContent>
       
//         {/* <Badge variant={
//           appraisal?.status === "completed"
//             ? "default"
//             : appraisal?.status === "in_progress"
//               ? "secondary"
//               : "outline"
//         }>
//   {appraisal?.status ? appraisal.status.replace("_", " ") : "N/A"}
//         </Badge> */}
     

//         {/* <div className="mb-3">
//           <div className="flex justify-between text-sm text-gray-600 mb-1">
//             <span>Progress</span>
//             <span>{appraisal.progress}%</span>
//           </div>
//           <Progress value={appraisal.progress} />
//         </div> */}

//       <CardFooter>
//         <Button onClick={handleViewAppraisal} className="w-full">View Appraisal</Button>
//       </CardFooter>
//     </Card>
//   )
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

return(
   <Card
                key={appraisal.employee.id}
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
                    <Badge className={getStatusColor(appraisal.employee.status)}>
                      {appraisal.employee.status}
                    </Badge>
                  </div>
  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Current Status: {appraisal.employee.status}
                      </span>
                      {getProgressFromStatus(appraisal.employee.status)}%
                    </div>
                    {/* <Progress
                      value={getProgressFromStatus(appraisal.employee.status)}
                      className="h-2"
                    /> */}
                    <div className="h-2"></div>
                    <div className="flex gap-2 flex-wrap" key={appraisal.appraisalId}>
                      <Button
                        size="sm"
                        onClick={() => {
                       
                          router.push(`/leads/appraisal/${appraisal.appraisalId}`);
                        }}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <User className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      
                      {appraisal.employee.status === "FEEDBACK_SUBMITTED" && (
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
