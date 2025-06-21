import { Badge } from "lucide-react";
import { format } from "path";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { de } from "date-fns/locale";
import { formatDate } from "../../components/functions"

interface CycleDetailsProps {
  cycle_name: string;
  startDate: string;
  endDate: string;
  current_status: "ACTIVE" | "COMPLETED" | "UPCOMING";
}
const CycleDetails=({cycle}:CycleDetailsProps)=>{
     return (
    <Card className="max-w-md shadow-xl rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{cycle.cycle_name}</CardTitle>
        {/* <Badge className={`${cycle.statusColor[cycle.current_status]} text-white`}>{cycle.current_status}</Badge> */}
         <Badge >{cycle.current_status}</Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Start Date: </span>
        {formatDate(cycle.startDate)}
        </div>
        <div>
          <span className="font-medium text-foreground">End Date: </span>
        {formatDate(cycle.endDate)}
        </div>
      </CardContent>
    </Card>
  );
}
export default CycleDetails;