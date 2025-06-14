"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { PastAppraisalsModal } from "./PastAppraisalsModal";
import { PastAppraisalSummary } from "@/types";

const competencies = [
  "Technical",
  "Functional",
  "Communication",
  "Energy & Drive",
  "Responsibilites & Trust",
  "Teamwork",
  "Managing Processes & Work",
];

export const LeadEvaluationForm = () => {
  const [isPastAppraisalsOpen, setIsPastAppraisalsOpen] = useState(false);

  // Mock data - replace with actual data from your API
  const pastAppraisals: PastAppraisalSummary[] = [
    {
      id: "past-1",
      team: "Frontend",
      designation: "Junior Developer",
      lead: "Mike Chen",
      period: { from: "2023-07-01", to: "2023-12-31" },
    },
    {
      id: "past-2",
      team: "Frontend",
      designation: "Intern",
      lead: "Mike Chen",
      period: { from: "2023-01-01", to: "2023-06-30" },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lead Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Competency</TableHead>
                <TableHead className="w-1/4">Strengths</TableHead>
                <TableHead className="w-1/4">Improvement Needed</TableHead>
                <TableHead className="w-1/4">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competencies.map((competency) => (
                <TableRow key={competency}>
                  <TableCell className="font-medium">{competency}</TableCell>
                  <TableCell>
                    <Textarea id={`strengths-${competency}`} />
                  </TableCell>
                  <TableCell>
                    <Textarea id={`improvements-${competency}`} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Slider
                        id={`rating-${competency}`}
                        min={1}
                        max={10}
                        step={1}
                        defaultValue={[5]}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setIsPastAppraisalsOpen(true)}
            >
              View Past Appraisals
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit Evaluation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <PastAppraisalsModal
        open={isPastAppraisalsOpen}
        onOpenChange={setIsPastAppraisalsOpen}
        pastAppraisals={pastAppraisals}
      />
    </>
  );
};