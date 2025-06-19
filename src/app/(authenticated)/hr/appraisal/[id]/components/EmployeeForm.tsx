import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import AppraisalDetailsView from "@/components/hr/AppraisalDetailsView";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/types";
import { X, FileX2 } from "lucide-react";

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appraisal: (Employee & { appraisalId: string }) | null;
}

// Skeleton component for a polished loading state
const FormSkeleton = () => (
  <div className="p-8 space-y-12 animate-pulse">
    {/* Performance Factors Skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-7 w-1/3 bg-white/10" />
      <Skeleton className="h-4 w-2/3 bg-white/10" />
      <div className="border border-white/10 rounded-lg p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="space-y-3 pb-4 border-b border-white/10 last:border-b-0"
          >
            <Skeleton className="h-5 w-1/4 bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-3/4 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
    {/* IDP Skeleton */}
    <div className="space-y-4">
      <Skeleton className="h-7 w-1/3 bg-white/10" />
      <Skeleton className="h-4 w-2/3 bg-white/10" />
      <div className="border border-white/10 rounded-lg p-4 space-y-3">
        <Skeleton className="h-4 w-full bg-white/10" />
        <Skeleton className="h-4 w-5/6 bg-white/10" />
      </div>
    </div>
  </div>
);

const EmployeeForm = ({ open, onOpenChange, appraisal }: EmployeeFormProps) => {
  // Best practice: Use the 'skip' option to prevent the query from running without an ID
  const { data, isLoading, isError } = useGetAppraisalByIdQuery(
    appraisal?.appraisalId!,
    {
      skip: !appraisal?.appraisalId,
    }
  );

  // Check if the IDP section has content to display
  const shouldShowIdp = !!(
    data?.idp &&
    data.idp.goals &&
    data.idp.goals.length > 0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="min-w-[70%] max-h-[90vh] overflow-hidden flex flex-col p-0 
                                bg-[#002A35]/80 backdrop-blur-xl border border-white/10 
                                text-white rounded-2xl shadow-2xl"
      >
        <DialogHeader
          className="sticky top-0 z-10 flex-shrink-0
                                 px-8 py-5 border-b border-white/10"
        >
          <DialogTitle className="text-2xl font-semibold text-white">
            Employee Appraisal: {appraisal?.name || ""}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <FormSkeleton />
          ) : isError || !data ? (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <FileX2 className="h-10 w-10 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                No Data Found
              </h3>
              <p className="text-white/60 mt-1">
                Could not retrieve appraisal details for this employee.
              </p>
            </div>
          ) : (
            <div className="p-8">
              <AppraisalDetailsView
                selfAppraisal={data.self_appraisal}
                performanceFactors={data.performance_factors}
                idp={data.idp}
                viewingAs={data.viewing_as}
                showIdpSection={shouldShowIdp} // Pass the conditional prop down
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
