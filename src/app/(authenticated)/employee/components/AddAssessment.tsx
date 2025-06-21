import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Assessment {
  deliveryDetails: string;
  accomplishments: string;
  approaches: string;
  improvements: string;
  timeFrame: string;
}

interface Props {
  assessments: Assessment[];
  isReadOnly: boolean;
  errors: Record<string, string>;
  onChange: (index: number, field: keyof Assessment, value: string) => void;
  onRemove?: (index: number) => void;
}

export default function AddAssessment({
  assessments,
  isReadOnly,
  errors,
  onChange,
  onRemove,
}: Props) {
  const renderField = (
    value: string,
    error: string | undefined,
    placeholder: string,
    onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    isTextArea: boolean = true
  ) => {
    return isReadOnly ? (
      <p className="p-2 bg-gray-50 rounded min-h-[40px]">{value || "-"}</p>
    ) : (
      <>
        {isTextArea ? (
          <Textarea
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
            className="min-h-[80px]"
          />
        ) : (
          <Input value={value} onChange={onChangeHandler} placeholder={placeholder} />
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">SN</TableHead>
          <TableHead>Delivery Details</TableHead>
          <TableHead>Highlights of Accomplishments</TableHead>
          <TableHead>Approach/Solution Taken</TableHead>
          <TableHead>Improvement Possibilities</TableHead>
          <TableHead>Time Frame</TableHead>
          {!isReadOnly && <TableHead className="w-[50px]">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {assessments.map((assessment, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {renderField(
                assessment.deliveryDetails,
                errors[`selfAssessments.${index}.deliveryDetails`],
                "Enter delivery details...",
                (e) => onChange(index, "deliveryDetails", e.target.value)
              )}
            </TableCell>
            <TableCell>
              {renderField(
                assessment.accomplishments,
                errors[`selfAssessments.${index}.accomplishments`],
                "Enter accomplishments...",
                (e) => onChange(index, "accomplishments", e.target.value)
              )}
            </TableCell>
            <TableCell>
              {renderField(
                assessment.approaches,
                errors[`selfAssessments.${index}.approaches`],
                "Enter approach/solution...",
                (e) => onChange(index, "approaches", e.target.value)
              )}
            </TableCell>
            <TableCell>
              {renderField(
                assessment.improvements,
                errors[`selfAssessments.${index}.improvements`],
                "Enter improvement possibilities...",
                (e) => onChange(index, "improvements", e.target.value)
              )}
            </TableCell>
            <TableCell>
              {renderField(
                assessment.timeFrame,
                errors[`selfAssessments.${index}.timeFrame`],
                "Enter time frame...",
                (e) => onChange(index, "timeFrame", e.target.value),
                false
              )}
            </TableCell>
            {!isReadOnly && (
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove?.(index)}
                  disabled={assessments.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
