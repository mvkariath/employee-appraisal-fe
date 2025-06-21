import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

interface IndividualDevelopmentPlan {
  technical: string;
  behavioral: string;
  functional: string;
}

interface Props {
  plan: IndividualDevelopmentPlan;
  isReadOnly: boolean;
  errors: Record<string, string>;
  onChange: (field: keyof IndividualDevelopmentPlan, value: string) => void;
}

export default function IndividualDevelopmentPlanTable({
  plan,
  isReadOnly,
  errors,
  onChange,
}: Props) {
  const fields: (keyof IndividualDevelopmentPlan)[] = ["technical", "behavioral", "functional"];

  const labels: Record<keyof IndividualDevelopmentPlan, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    functional: "Functional",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Individual Objectives</TableHead>
          <TableHead>Development Plan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field}>
            <TableCell className="font-medium">{labels[field]}</TableCell>
            <TableCell>
              {isReadOnly ? (
                <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                  {plan[field] || "-"}
                </p>
              ) : (
                <>
                  <Textarea
                    value={plan[field]}
                    onChange={(e) => onChange(field, e.target.value)}
                    placeholder={`Enter ${labels[field].toLowerCase()} development plan...`}
                    className="min-h-[80px]"
                  />
                  {errors[`individualDevelopmentPlan.${field}`] && (
                    <p className="text-xs text-red-500">
                      {errors[`individualDevelopmentPlan.${field}`]}
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
