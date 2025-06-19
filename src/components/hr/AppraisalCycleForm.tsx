"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Save, X } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useGetEmployeesQuery } from "@/api-service/employees/employee.api";
import { useCreateCycleMutation } from "@/api-service/appraisalCycle/appraisalCycle.api";
import { Skeleton } from "@/components/ui/skeleton";

// --- TYPE DEFINITIONS & HELPERS ---
interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
}

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const useDetails = token ? JSON.parse(token) : null;

interface AppraisalCycleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmployeeListSkeleton = () => (
  <div className="space-y-3">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center space-x-3 p-2">
        <Skeleton className="h-5 w-5 rounded bg-white/10" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-1/2 bg-white/10" />
          <Skeleton className="h-3 w-1/3 bg-white/10" />
        </div>
      </div>
    ))}
  </div>
);

// --- MAIN COMPONENT ---
const AppraisalCycleModal = ({
  open,
  onOpenChange,
}: AppraisalCycleModalProps) => {
  const [cycleName, setCycleName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { data: employees = [], isLoading: isLoadingEmployees } =
    useGetEmployeesQuery();
  const [createCycle, { isLoading: isCreating }] = useCreateCycleMutation();

  const filteredEmployees = employees?.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmployeeToggle = (employeeId: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
    setErrors((prev) => ({ ...prev, employees: "" }));
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === employees.length
        ? []
        : employees.map((emp) => emp.id)
    );
    setErrors((prev) => ({ ...prev, employees: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!cycleName.trim()) newErrors.cycleName = "Cycle name is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!endDate) newErrors.endDate = "End date is required.";
    if (startDate && endDate && startDate >= endDate)
      newErrors.endDate = "End date must be after start date.";
    if (selectedEmployees.length === 0)
      newErrors.employees = "Select at least one employee.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted errors before saving.");
      return;
    }
    const payload = {
      name: cycleName,
      start_date: startDate,
      end_date: endDate,
      status: "INITIATED",
      created_by: useDetails.id,
      employees: selectedEmployees,
    };
    try {
      await createCycle(payload).unwrap();
      toast.success("Appraisal cycle created successfully!");
      handleClose(); // Use a single close/reset handler
    } catch (error) {
      toast.error("Failed to create appraisal cycle. Please try again.");
    }
  };

  const handleClose = () => {
    setCycleName("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedEmployees([]);
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="min-w-[80%] max-h-[90vh] flex flex-col p-0
                                bg-[#002A35]/80 backdrop-blur-xl border border-white/10 
                                text-white rounded-2xl shadow-2xl"
      >
        <DialogHeader className="p-6 border-b border-white/10 flex-shrink-0">
          <DialogTitle className="text-2xl font-semibold">
            Create New Appraisal Cycle
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Set up a new performance review and select employees.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="space-y-2">
            <Label htmlFor="cycleName" className="text-white/80">
              Cycle Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="cycleName"
              value={cycleName}
              onChange={(e) => {
                setCycleName(e.target.value);
                setErrors((p) => ({ ...p, cycleName: "" }));
              }}
              className={cn(
                "bg-black/20 border-white/20 placeholder:text-white/40",
                errors.cycleName && "border-red-400 focus-visible:ring-red-400"
              )}
              placeholder="e.g., Q1 2024 Performance Review"
            />
            {errors.cycleName && (
              <p className="text-sm text-red-400 mt-1">{errors.cycleName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white/80">
                Start Date <span className="text-red-400">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-black/20 border-white/20 hover:bg-black/40 hover:text-white",
                      !startDate && "text-white/60",
                      errors.startDate && "border-red-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[#002A35]/80 backdrop-blur-xl border-white/10 text-white"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(d) => {
                      setStartDate(d);
                      setErrors((p) => ({ ...p, startDate: "" }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-sm text-red-400 mt-1">{errors.startDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">
                End Date <span className="text-red-400">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-black/20 border-white/20 hover:bg-black/40 hover:text-white",
                      !endDate && "text-white/60",
                      errors.endDate && "border-red-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[#002A35]/80 backdrop-blur-xl border-white/10 text-white"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(d) => {
                      setEndDate(d);
                      setErrors((p) => ({ ...p, endDate: "" }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-sm text-red-400 mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-white/80">
                Select Employees ({selectedEmployees.length}/{employees.length}){" "}
                <span className="text-red-400">*</span>
              </Label>
              <Button
                variant="ghost"
                onClick={handleSelectAll}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                {selectedEmployees.length === employees.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            {selectedEmployees.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-black/20 border border-white/10 rounded-lg">
                {selectedEmployees.map((id) => {
                  const emp = employees.find((e) => e.id === id);
                  return emp ? (
                    <div
                      key={emp.id}
                      className="flex items-center bg-blue-500/20 text-blue-200 rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {emp.name}
                      <button
                        onClick={() => handleEmployeeToggle(emp.id)}
                        className="ml-2 text-blue-200/70 hover:text-white"
                        aria-label={`Remove ${emp.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <Input
              placeholder="Search by name, role, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border-white/20 placeholder:text-white/40"
            />

            <div className="border border-white/10 rounded-lg p-4 max-h-64 overflow-y-auto bg-black/20">
              {isLoadingEmployees ? (
                <EmployeeListSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-1">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-start space-x-3 p-2 hover:bg-white/10 rounded-md transition cursor-pointer"
                        onClick={() => handleEmployeeToggle(employee.id)}
                      >
                        <Checkbox
                          id={`employee-${employee.id}`}
                          checked={selectedEmployees.includes(employee.id)}
                          className="mt-0.5 border-white/30"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={`employee-${employee.id}`}
                            className="font-medium text-white cursor-pointer"
                          >
                            {employee.name}
                          </label>
                          <p className="text-xs text-white/60">
                            {employee.role} • {employee.department}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/60 text-center py-4">
                      No employees found.
                    </p>
                  )}
                </div>
              )}
            </div>
            {errors.employees && (
              <p className="text-sm text-red-400 mt-1">{errors.employees}</p>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-white/10 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isCreating}
            className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-opacity rounded-lg"
          >
            <Save className="h-4 w-4" />
            {isCreating ? "Creating..." : "Create Cycle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppraisalCycleModal;
