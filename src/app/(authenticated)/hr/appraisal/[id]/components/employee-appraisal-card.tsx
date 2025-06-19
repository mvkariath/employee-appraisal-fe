import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowRight, FileText, User, Video } from "lucide-react";

// You can keep these helper functions here or in a shared file
const getGlassStatusStyles = (status: string) => {
  switch (status) {
    case "PENDING":
    case "SELF_APPRAISED":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
    case "FEEDBACK_SUBMITTED":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "COMPLETED":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

const getProgressFromStatus = (status: string): number => {
  switch (status) {
    case "PENDING":
      return 10;
    case "SELF_APPRAISED":
      return 50;
    case "FEEDBACK_SUBMITTED":
      return 75;
    case "COMPLETED":
      return 100;
    default:
      return 0;
  }
};

// Define the type for the employee object for strong typing
type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
};

// Define props for the component, including event handlers
interface EmployeeCardProps {
  employee: Employee;
  onViewForm: (employee: Employee) => void;
  onPushToLead: (employee: Employee) => void;
  onConductMeeting: (employee: Employee) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onViewForm,
  onPushToLead,
  onConductMeeting,
}) => {
  const progress = getProgressFromStatus(employee.status);
  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 rounded-xl flex flex-col">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {initials}
            </div>
            <div>
              <h3 className="font-semibold text-white">{employee.name}</h3>
              <p className="text-sm text-white/60 capitalize">
                {employee.role?.toLowerCase()} • {employee.department}
              </p>
            </div>
          </div>
          <Badge
            className={cn(
              "border font-medium capitalize",
              getGlassStatusStyles(employee.status)
            )}
          >
            {employee.status.replace("_", " ").toLowerCase()}
          </Badge>
        </div>

        <div className="space-y-4 mt-auto">
          <div className="flex justify-between items-center text-sm text-white/70">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-white/10"
            indicatorClassName="bg-gradient-to-r from-blue-400 to-cyan-300"
          />

          <div className="flex gap-2 flex-wrap pt-2">
            <Button
              size="sm"
              onClick={() => onViewForm(employee)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex-1"
            >
              <FileText className="h-4 w-4 mr-2" /> View Form
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
            >
              <User className="h-4 w-4 mr-2" /> Contact
            </Button>

            {employee.status === "SELF_APPRAISED" && (
              <Button
                size="sm"
                onClick={() => onPushToLead(employee)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg w-full mt-2"
              >
                <ArrowRight className="h-4 w-4 mr-2" /> Push to Lead
              </Button>
            )}
            {employee.status === "FEEDBACK_SUBMITTED" && (
              <Button
                size="sm"
                onClick={() => onConductMeeting(employee)}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg w-full mt-2"
              >
                <Video className="h-4 w-4 mr-2" /> Conduct Meeting
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const EmployeeCardSkeleton = () => (
  <Card className="bg-white/5 border border-white/10 rounded-xl">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-white/10" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-white/10" />
            <Skeleton className="h-4 w-24 bg-white/10" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/3 bg-white/10" />
        <Skeleton className="h-2 w-full bg-white/10" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1 rounded-lg bg-white/10" />
          <Skeleton className="h-9 w-28 rounded-lg bg-white/10" />
        </div>
      </div>
    </CardContent>
  </Card>
);
