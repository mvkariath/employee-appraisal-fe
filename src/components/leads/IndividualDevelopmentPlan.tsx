"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type RowType = "Technical" | "Behavioural" | "Functional"

type PlanRow = {
  type: RowType
  individualObjective: string
  developmentPlan: string[]
}

type IndividualDevelopmentPlanProps = {
  readOnly?: boolean;
  //initialRows?: PlanRow[];

};

const initialData: PlanRow[] = [
  { type: "Technical", individualObjective: "", developmentPlan: [""] },
  { type: "Behavioural", individualObjective: "", developmentPlan: [""] },
  { type: "Functional", individualObjective: "", developmentPlan: [""] },
]

export default function IndividualDevelopmentPlan({readOnly}: IndividualDevelopmentPlanProps) {
  const [rows, setRows] = useState<PlanRow[]>(initialData)

  const handleObjectiveChange = (index: number, value: string) => {
    const updated = [...rows]
    updated[index].individualObjective = value
    setRows(updated)
  }

  const handlePlanChange = (rowIndex: number, planIndex: number, value: string) => {
    const updated = [...rows]
    updated[rowIndex].developmentPlan[planIndex] = value
    setRows(updated)
  }

  const addPlanItem = (rowIndex: number) => {
    const updated = [...rows]
    updated[rowIndex].developmentPlan.push("")
    setRows(updated)
  }

  const removePlanItem = (rowIndex: number, planIndex: number) => {
    const updated = [...rows]
    updated[rowIndex].developmentPlan.splice(planIndex, 1)
    setRows(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Individual Development Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area</TableHead>
              <TableHead>Individual Objective</TableHead>
              <TableHead>Development Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={row.type}>
                <TableCell className="font-medium">{row.type}</TableCell>
                <TableCell>
                  <Textarea
                    value={row.individualObjective}
                    onChange={(e) => handleObjectiveChange(rowIndex, e.target.value)}
                    placeholder="Enter objective"
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {row.developmentPlan.map((plan, planIndex) => (
                      <div key={planIndex} className="flex gap-2 items-center">
                        <Input
                          value={plan}
                          onChange={(e) => handlePlanChange(rowIndex, planIndex, e.target.value)}
                          placeholder="Development plan item"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removePlanItem(rowIndex, planIndex)}
                          disabled={row.developmentPlan.length === 1}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button type="button" size="sm" onClick={() => addPlanItem(rowIndex)}>
                      + Add Item
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
