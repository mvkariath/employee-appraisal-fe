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
import { format } from "date-fns";
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

  // Mock employee data - replace with actual data source
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
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map((emp) => emp.id));
    }
  };

  const validateForm = () => {
    if (!cycleName.trim()) {
      toast("Cycle name is required.");
      return false;
    }

    if (!startDate) {
      toast("Start date is required.");
      return false;
    }

    if (!endDate) {
      toast("End date is required.");
      return false;
    }

    if (startDate >= endDate) {
      toast("End date must be after start date.");
      return false;
    }

    if (selectedEmployees.length === 0) {
      toast("Please select at least one employee.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

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

    // Reset form
    setCycleName("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedEmployees([]);
    onOpenChange(false);
  };

  const handleClose = () => {
    setCycleName("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedEmployees([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[80%] min-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Appraisal Cycle</DialogTitle>
          <DialogDescription>
            Set up a new performance review cycle and select the employees to
            include.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cycle Name */}
          <div className="space-y-2">
            <Label htmlFor="cycleName">Cycle Name *</Label>
            <Input
              id="cycleName"
              placeholder="e.g., Q1 2024 Performance Review"
              value={cycleName}
              onChange={(e) => setCycleName(e.target.value)}
            />
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Employee Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Select Employees ({selectedEmployees.length}/20)</Label>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedEmployees.length === employees.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-1 gap-3">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`employee-${employee.id}`}
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={() => handleEmployeeToggle(employee.id)}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`employee-${employee.id}`}
                        className="text-sm font-medium cursor-pointer"
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Create Cycle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppraisalCycleModal;
