import { useState } from "react";
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

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
}

interface AppraisalCycleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (cycleData: any) => void;
}

const AppraisalCycleModal = ({
  open,
  onOpenChange,
  onSave,
}: AppraisalCycleModalProps) => {
  const [cycleName, setCycleName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const today = startOfDay(new Date());

  const employees: Employee[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      department: "Engineering",
      role: "Senior Developer",
    },
    {
      id: 2,
      name: "David Rodriguez",
      department: "Marketing",
      role: "Marketing Specialist",
    },
    { id: 3, name: "Emily Chen", department: "Design", role: "UX Designer" },
    {
      id: 4,
      name: "Michael Brown",
      department: "Engineering",
      role: "Frontend Developer",
    },
    { id: 5, name: "Lisa Park", department: "HR", role: "HR Manager" },
    { id: 6, name: "John Smith", department: "Sales", role: "Sales Manager" },
    {
      id: 7,
      name: "Anna Williams",
      department: "Finance",
      role: "Financial Analyst",
    },
    {
      id: 8,
      name: "Robert Wilson",
      department: "Engineering",
      role: "Backend Developer",
    },
    {
      id: 9,
      name: "Jessica Davis",
      department: "Marketing",
      role: "Content Manager",
    },
    {
      id: 10,
      name: "Christopher Lee",
      department: "Design",
      role: "Product Designer",
    },
    {
      id: 11,
      name: "Amanda Taylor",
      department: "Operations",
      role: "Operations Manager",
    },
    {
      id: 12,
      name: "James Anderson",
      department: "Engineering",
      role: "DevOps Engineer",
    },
    {
      id: 13,
      name: "Nicole Martin",
      department: "Sales",
      role: "Sales Representative",
    },
    {
      id: 14,
      name: "Kevin Thompson",
      department: "Finance",
      role: "Accountant",
    },
    { id: 15, name: "Rachel Garcia", department: "HR", role: "Recruiter" },
    {
      id: 16,
      name: "Daniel Martinez",
      department: "Engineering",
      role: "QA Engineer",
    },
    {
      id: 17,
      name: "Michelle Robinson",
      department: "Marketing",
      role: "Social Media Manager",
    },
    { id: 18, name: "Brian Clark", department: "Design", role: "UI Designer" },
    {
      id: 19,
      name: "Stephanie Lewis",
      department: "Operations",
      role: "Project Manager",
    },
    {
      id: 20,
      name: "Mark Walker",
      department: "Sales",
      role: "Account Manager",
    },
  ];

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
    if (startDate && startDate < today)
      newErrors.startDate = "Start date cannot be in the past.";
    if (startDate && endDate && startDate >= endDate)
      newErrors.endDate = "End date must be after start date.";
    if (selectedEmployees.length === 0)
      newErrors.employees = "Select at least one employee.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast("Please fix the highlighted errors.");
      return;
    }

    const cycleData = {
      name: cycleName,
      startDate,
      endDate,
      selectedEmployees: selectedEmployees.map((id) =>
        employees.find((emp) => emp.id === id)
      ),
      status: "Planning",
    };

    onSave?.(cycleData);
    toast("Appraisal cycle created successfully!");

    setCycleName("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedEmployees([]);
    setErrors({});
    onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[80%] min-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl">
        <DialogHeader className="sticky top-0 z-10 py-4 px-6 bg-white border-b border-gray-200 rounded-t-2xl">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Create New Appraisal Cycle
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Set up a new performance review cycle and select the employees to
            include.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-8">
          {/* Cycle Name */}
          <div className="space-y-1">
            <Label htmlFor="cycleName">
              Cycle Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cycleName"
              value={cycleName}
              onChange={(e) => {
                setCycleName(e.target.value);
                setErrors((prev) => ({ ...prev, cycleName: "" }));
              }}
              className={cn(errors.cycleName && "border-red-500")}
              placeholder="e.g., Q1 2024 Performance Review"
            />
            {errors.cycleName && (
              <p className="text-sm text-red-500 mt-1">{errors.cycleName}</p>
            )}
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label>
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      !startDate && "text-muted-foreground",
                      errors.startDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setErrors((prev) => ({ ...prev, startDate: "" }));
                    }}
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>
                End Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      !endDate && "text-muted-foreground",
                      errors.endDate && "border-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      setErrors((prev) => ({ ...prev, endDate: "" }));
                    }}
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Employee Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>
                Select Employees ({selectedEmployees.length}/{employees.length})
              </Label>
              <Button variant="ghost" onClick={handleSelectAll}>
                {selectedEmployees.length === employees.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>
            {errors.employees && (
              <p className="text-sm text-red-500 mt-1">{errors.employees}</p>
            )}

            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto bg-gray-50">
              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md"
                >
                  <Checkbox
                    id={`employee-${employee.id}`}
                    checked={selectedEmployees.includes(employee.id)}
                    onCheckedChange={() => handleEmployeeToggle(employee.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`employee-${employee.id}`}
                      className="text-sm font-medium text-gray-800 cursor-pointer"
                    >
                      {employee.name}
                    </label>
                    <p className="text-xs text-gray-500">
                      {employee.role} • {employee.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="bg-gray-50 px-6 py-4 rounded-b-2xl mt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button
            className="bg-gray-900 text-white hover:bg-black"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" /> Create Cycle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppraisalCycleModal;
