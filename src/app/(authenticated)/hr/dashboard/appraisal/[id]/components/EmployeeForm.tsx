import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import AppraisalDetailsView from "@/components/hr/AppraisalDetailsView";
import { Competency } from "@/components/hr/PerformanceFactorTable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Appraisal, Employee } from "@/types";
import { X } from "lucide-react";
import { Loader2 } from "lucide-react"; // Optional: for spinner icon

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appraisal: Employee & { appraisalId: string } | null;
};


const EmployeeForm = ({ open, onOpenChange, appraisal }: EmployeeFormProps) => {
  console.log("appraisla",appraisal)
  const { data, isLoading } = useGetAppraisalByIdQuery(appraisal?.appraisalId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[70%] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl bg-gradient-to-b from-white to-gray-50 p-0 border border-gray-200">
        <DialogHeader className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Employee Appraisal Form
            {appraisal ? ` - ${appraisal.name}` : ""}
          </DialogTitle>
          <DialogClose asChild>
            <button
              className="absolute right-6 top-6 rounded-full p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="p-6 md:p-12 w-full mx-auto  mb-12  space-y-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-6 w-6 text-gray-500 mr-2" />
              <span>Loading...</span>
            </div>
          ) : data ? (
            <AppraisalDetailsView
              selfAppraisal={data.self_appraisal}
              performanceFactors={data.performance_factors}
              idp={data.idp}
              viewingAs={data.viewing_as}
            />
          ) : (
            <div className="text-center text-gray-500 py-12">
              No data found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
