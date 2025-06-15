// app/employee/appraisals/components/EmployeeSelfAppraisalModal.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from '@/components/ui/muli-select';
import { X, Plus } from 'lucide-react';

interface EmployeeSelfAppraisalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, action: 'save' | 'submit') => void;
  employeeData: {
    name: string;
    designation: string;
    employeeNumber: string;
    team: string;
  };
  leadOptions: string[];
  isReadOnly?: boolean;
  initialData?: any;
}

interface FormData {
  leadNames: string[];
  assessments: {
    deliveryDetails: string;
    accomplishments: string;
    approaches: string;
    improvements: string;
    timeFrame: string;
  }[];
  developmentPlan?: string;  // Filled by HR/Lead (read-only for employee)
  remarks?: string;
}

export default function EmployeeSelfAppraisalModal({
  isOpen,
  onClose,
  onSubmit,
  employeeData,
  leadOptions,
  isReadOnly = false,
  initialData,
}: EmployeeSelfAppraisalModalProps) {
  const [formData, setFormData] = useState<FormData>(initialData || {
    leadNames: [],
    assessments: [{
      deliveryDetails: '',
      accomplishments: '',
      approaches: '',
      improvements: '',
      timeFrame: ''
    }],
    developmentPlan: '',
    remarks: ''
  });
  const handleAssessmentChange = (index: number, field: keyof FormData['assessments'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      assessments: prev.assessments.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };
  const addAssessment = () => {
    setFormData(prev => ({
      ...prev,
      assessments: [
        ...prev.assessments,
        {
          deliveryDetails: '',
          accomplishments: '',
          approaches: '',
          improvements: '',
          timeFrame: ''
        }
      ]
    }));
  };
  const removeAssessment = (index: number) => {
    if (formData.assessments.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      assessments: prev.assessments.filter((_, i) => i !== index)
    }));
  };
   const toggleLead = (lead: string) => {
    setFormData(prev => ({
      ...prev,
      leadNames: prev.leadNames.includes(lead)
        ? prev.leadNames.filter(l => l !== lead)
        : [...prev.leadNames, lead]
    }));
  };
  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof FormData] as string[]).map((item: string, i: number) => 
        i === index ? value : item
    )}));
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleLeadChange = (selectedLeads: string[]) => {
  //   setFormData(prev => ({ ...prev, leadNames: selectedLeads }));
  // };

  // const handleAction = (action: 'save' | 'submit') => (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(formData, action);
  //   if (action === 'submit') onClose();
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[95vw] !h-[90vh] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isReadOnly ? 'View Appraisal' : 'Employee Self Appraisal'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Employee performance assessment form
          </DialogDescription>
        </DialogHeader>

        {/* Employee Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div>
            <Label className="text-gray-500">Employee Name</Label>
            <p className="font-medium">{employeeData.name}</p>
          </div>
          <div>
            <Label className="text-gray-500">Designation</Label>
            <p className="font-medium">{employeeData.designation}</p>
          </div>
          <div>
            <Label className="text-gray-500">Team</Label>
            <p className="font-medium">{employeeData.team}</p>
          </div>
          
          {/* Lead Selection */}
          <div className="md:col-span-3">
            <Label>Leads</Label>
            {isReadOnly ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.leadNames.map(lead => (
                  <Badge key={lead} variant="secondary">
                    {lead}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {leadOptions.map(lead => (
                  <Button
                    key={lead}
                    variant={formData.leadNames.includes(lead) ? "default" : "outline"}
                    size="sm"
                    type="button"
                    onClick={() => toggleLead(lead)}
                  >
                    {lead}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Self Assessment Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Self Assessment</h3>
          {formData.assessments.map((assessment, index) => (
            <div key={index} className="space-y-4 mb-6 p-4 border rounded-lg">
              {!isReadOnly && formData.assessments.length > 1 && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => removeAssessment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Delivery Details</Label>
                  {isReadOnly ? (
                    <p className="mt-1">{assessment.deliveryDetails || '-'}</p>
                  ) : (
                    <Input
                      value={assessment.deliveryDetails}
                      onChange={(e) => handleAssessmentChange(index, 'deliveryDetails', e.target.value)}
                      required
                    />
                  )}
                </div>
                <div>
                  <Label>Accomplishments</Label>
                  {isReadOnly ? (
                    <p className="mt-1">{assessment.accomplishments || '-'}</p>
                  ) : (
                    <Input
                      value={assessment.accomplishments}
                      onChange={(e) => handleAssessmentChange(index, 'accomplishments', e.target.value)}
                      required
                    />
                  )}
                </div>
                <div>
                  <Label>Approach/Solution</Label>
                  {isReadOnly ? (
                    <p className="mt-1">{assessment.approaches || '-'}</p>
                  ) : (
                    <Input
                      value={assessment.approaches}
                      onChange={(e) => handleAssessmentChange(index, 'approaches', e.target.value)}
                    />
                  )}
                </div>
                <div>
                  <Label>Improvement Possibilities</Label>
                  {isReadOnly ? (
                    <p className="mt-1">{assessment.improvements || '-'}</p>
                  ) : (
                    <Input
                      value={assessment.improvements}
                      onChange={(e) => handleAssessmentChange(index, 'improvements', e.target.value)}
                    />
                  )}
                </div>
                <div>
                  <Label>Time Frame</Label>
                  {isReadOnly ? (
                    <p className="mt-1">{assessment.timeFrame || '-'}</p>
                  ) : (
                    <Input
                      value={assessment.timeFrame}
                      onChange={(e) => handleAssessmentChange(index, 'timeFrame', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {!isReadOnly && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addAssessment}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Assessment
            </Button>
          )}
        </div>

        {/* Development Plan (Read-only for employee) */}
        {formData.developmentPlan && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Development Plan</h3>
            <p className="whitespace-pre-wrap">
              {formData.developmentPlan}
            </p>
          </div>
        )}

        {/* Remarks (Read-only for employee) */}
        {formData.remarks && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Remarks</h3>
            <p className="whitespace-pre-wrap">
              {formData.remarks}
            </p>
          </div>
        )}

        {!isReadOnly && (
          <div className="flex justify-end gap-2">
            <Button 
    variant="outline" 
    onClick={() => onSubmit(formData, 'save')}
  >
    Save Draft
  </Button>
  <Button 
    onClick={() => onSubmit(formData, 'submit')}
  >
    Submit
  </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}