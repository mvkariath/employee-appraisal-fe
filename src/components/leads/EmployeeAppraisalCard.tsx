import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export interface EmployeeAppraisalCardProps {
  appraisal: {
    employeeId: string
    employeeName: string
    dueDate: string
    progress: number
    status: "pending" | "in_progress" | "completed"
  }
}

export const EmployeeAppraisalCard = ({ appraisal }: EmployeeAppraisalCardProps) => {
  const router = useRouter()

  const handleViewAppraisal = () => {
    router.push(`/leads/appraisal/${appraisal.employeeId}`)
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle>{appraisal.employeeName}</CardTitle>
          <CardDescription>Due: {appraisal.dueDate}</CardDescription>
        </div>
        <Badge variant={
          appraisal?.status === "completed"
            ? "default"
            : appraisal?.status === "in_progress"
              ? "secondary"
              : "outline"
        }>
  {appraisal?.status ? appraisal.status.replace("_", " ") : "N/A"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
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
  )
}
