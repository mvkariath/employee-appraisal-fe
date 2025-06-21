import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface PerformanceFactor {
  competency: string;
  strengths: string;
  improvementNeeds: string;
  rating: string;
}

interface Props {
  performanceFactors: PerformanceFactor[];
  isReadOnly: boolean;
  errors: Record<string, string>;
  handlePerformanceFactorChange: (index: number, field: keyof PerformanceFactor, value: string) => void;
}

export default function PerformanceFactors({
  performanceFactors,
  isReadOnly,
  errors,
  handlePerformanceFactorChange,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">SN</TableHead>
          <TableHead>Competencies</TableHead>
          <TableHead>Strengths</TableHead>
          <TableHead>Improvement Needs</TableHead>
          <TableHead>Rating (1-10)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {performanceFactors.map((factor, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{factor.competency}</TableCell>

            <TableCell>
              {isReadOnly ? (
                <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                  {factor.strengths || "-"}
                </p>
              ) : (
                <>
                  <Textarea
                    value={factor.strengths}
                    onChange={(e) =>
                      handlePerformanceFactorChange(index, "strengths", e.target.value)
                    }
                    placeholder="Enter strengths..."
                    className="min-h-[80px]"
                  />
                  {errors[`performanceFactors.${index}.strengths`] && (
                    <p className="text-xs text-red-500">
                      {errors[`performanceFactors.${index}.strengths`]}
                    </p>
                  )}
                </>
              )}
            </TableCell>

            <TableCell>
              {isReadOnly ? (
                <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                  {factor.improvementNeeds || "-"}
                </p>
              ) : (
                <>
                  <Textarea
                    value={factor.improvementNeeds}
                    onChange={(e) =>
                      handlePerformanceFactorChange(index, "improvementNeeds", e.target.value)
                    }
                    placeholder="Enter improvement needs..."
                    className="min-h-[80px]"
                  />
                  {errors[`performanceFactors.${index}.improvementNeeds`] && (
                    <p className="text-xs text-red-500">
                      {errors[`performanceFactors.${index}.improvementNeeds`]}
                    </p>
                  )}
                </>
              )}
            </TableCell>

            <TableCell>
              {isReadOnly ? (
                <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                  {factor.rating || "-"}
                </p>
              ) : (
                <>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={factor.rating}
                    onChange={(e) =>
                      handlePerformanceFactorChange(index, "rating", e.target.value)
                    }
                    placeholder="1-10"
                  />
                  {errors[`performanceFactors.${index}.rating`] && (
                    <p className="text-xs text-red-500">
                      {errors[`performanceFactors.${index}.rating`]}
                    </p>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
