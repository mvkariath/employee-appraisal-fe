"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { IndividualDevelopmentPlan } from "@/api-service/leads/types"


export default function IndividualDevelopmentPlanForm({idpData,handleChange}: {idpData:IndividualDevelopmentPlan[],handleChange:(index,field,value)=>void}) {




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
            {idpData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="font-medium">{row.competency}</TableCell>
                <TableCell>
                  <Textarea
                    value={row.technical_objective}
                    onChange={(e) => handleChange(rowIndex,"technical_objective", e.target.value)}
                    placeholder="Enter objective"
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    
                      <div  className="flex gap-2 items-center">
                        <Input
                          value={row.technical_plan}
                          onChange={(e) => handleChange(rowIndex, "technical_plan", e.target.value)}
                          placeholder="Development plan "
                        />
                     
                      </div>
                  
            
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
