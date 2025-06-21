import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { PastAppraisalsModal } from "./PastAppraisalsModal";
import { PastAppraisalSummary } from "@/types";
import { PerformanceFactor } from "@/api-service/leads/types";
import { Input } from "../ui/input";

const competencies = [
  "Technical",
  "Functional",
  "Communication",
  "Energy & Drive",
  "Responsibilites & Trust",
  "Teamwork",
  "Managing Processes & Work",
];

interface LeadEvaluationFormProps {
  evaluations:PerformanceFactor[],
  onChange:(index,field,value)=>void

}


export const LeadEvaluationForm = ({
  evaluations,
  onChange,

}: LeadEvaluationFormProps) => {
  
  return (
    <>
      <Card >
        <CardHeader> 
          <CardTitle className="font-medium">PERFORMANCE FACTORS</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border-blue-200">
            <TableHeader className="bg-gradient-to-r from-blue-400 to-blue-200 text-white h-15" >
              <TableRow >
                <TableHead className="w-1/4">Competency</TableHead>
                <TableHead className="w-1/4">Strengths</TableHead>
                <TableHead className="w-1/4">Improvement Needed</TableHead>
                <TableHead className="w-1/4">Rating</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody >
            {evaluations.map((item, index) => (
  <TableRow key={item.competency}>
    <TableCell className="font-medium">{item.competency}</TableCell>
    <TableCell>
      <Textarea
        id={`strengths-${item.competency}`}
        value={item.strengths ?? ""}
        onChange={(e) =>
          onChange(index, "strengths", e.target.value)
        }
    
      />
    </TableCell>
    <TableCell>
      <Textarea
        id={`improvements-${item.competency}`}
        value={item.improvements ?? ""}
        onChange={(e) =>
          onChange(index, "improvements", e.target.value)
        }
      />
    </TableCell>
        <TableCell>
        <Input
        type="number"
        id={`rating-${item.competency}`}
        value={item.rating ?? 0}
        min={0}
        max={10}
        className="w-40"
        onChange={(e) =>
          onChange(index, "rating", parseInt(e.target.value, 10) || 0)
        }
      />
    </TableCell>
  </TableRow>
))}
          </TableBody>
          </Table>

   
        </CardContent>
      </Card>


    </>
  );
};
