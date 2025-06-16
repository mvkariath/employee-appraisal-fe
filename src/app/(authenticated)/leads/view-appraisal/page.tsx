"use client"

import { useState } from "react"
import { EmployeeAppraisalCard } from  "@/components/leads/EmployeeAppraisalCard"
import { Toggle } from "@/components/ui/toggle"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LayoutGrid, List } from "lucide-react"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { EmployeeAppraisalsTable } from "@/components/leads/EmployeeAppraisalsTable"
import { EmployeeAppraisal } from "@/types"

const mockAppraisals:EmployeeAppraisal[] = [
  { employeeId: "1", employeeName: "Alice Johnson", dueDate: "2025-07-01", progress: 80, status: "completed" },
  { employeeId: "2", employeeName: "Bob Smith", dueDate: "2025-07-10", progress: 50, status: "in_progress" },
  { employeeId: "3", employeeName: "Carol Lee", dueDate: "2025-07-15", progress: 0, status: "pending" },
  { employeeId: "4", employeeName: "David Kim", dueDate: "2025-07-20", progress: 25, status: "in_progress" },
]

export default function AppraisalsPage() {
  const [view, setView] = useState<"grid" | "table">("grid")
  const router = useRouter()

  const handleViewAppraisal = (employeeId: string) => {
    router.push(`/leads/appraisal/${employeeId}`)
  }

  return (
    <div className="container mx-auto py-8 px-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Appraisals</h1>
        <div className="flex gap-2">
          <Toggle
            pressed={view === "grid"}
            onPressedChange={() => setView("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-5 w-5" />
          </Toggle>
          <Toggle
            pressed={view === "table"}
            onPressedChange={() => setView("table")}
            aria-label="Table view"
          >
            <List className="h-5 w-5" />
          </Toggle>
        </div>
      </div>

      {/* Render view */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAppraisals.map((appraisal) => (
            <EmployeeAppraisalCard key={appraisal.employeeId} appraisal={appraisal} />
          ))}
        </div>
      ) : (
        <EmployeeAppraisalsTable mockAppraisals={mockAppraisals} />
      )}
    </div>
  )
}
