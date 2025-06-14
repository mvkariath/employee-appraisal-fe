import AppraisalDetailsView from "@/components/hr/AppraisalDetailsView";
import { Competency } from "@/components/hr/PerformanceFactorTable";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface EmployeeFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selfAppraisalData: {
        delivery_details: string;
        accomplishments: string;
        approach_solution: string;
        improvement_possibilities: string;
        project_time_frame: string;
        leads: string[]
    };
    performanceFactorData: {
        competency: Competency;
        strengths: string;
        improvements: string;
        rating: number;
    }[];
}

const EmployeeForm = ({
    open,
    onOpenChange,
    selfAppraisalData,
    performanceFactorData,
}: EmployeeFormProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="min-w-[70%] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl bg-gradient-to-b from-white to-gray-50 p-0 border border-gray-200"
            >
                <DialogHeader className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
                    <DialogTitle className="text-2xl font-semibold text-gray-800">
                        Employee Appraisal Form
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


                <div className="p-6 md:p-12 max-w-7xl mx-auto mt-6 mb-12 bg-white rounded-xl shadow-inner space-y-8">
                    <AppraisalDetailsView
                        selfAppraisal={selfAppraisalData}
                        performanceFactors={performanceFactorData}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeForm;
