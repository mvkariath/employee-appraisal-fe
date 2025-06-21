// EmployeeSelfAppraisalModal.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, X } from "lucide-react";

import { MessageCircle } from "lucide-react";
import EmployeeDetails from "./employeeDetails";
import PerformanceFactors from "./performancefactorDetails";
import IndividualDevelopmentPlanTable from "./IDPDetails";
import AddAssessment from "./AddAssessment";
interface EmployeeData {
  name: string;
  designation: string;
  employeeNumber: string;
  team: string;
}

interface SelfAssessment {
  deliveryDetails: string;
  accomplishments: string;
  approaches: string;
  improvements: string;
  timeFrame: string;
}

interface PerformanceFactor {
  competency: string;
  strengths: string;
  improvementNeeds: string;
  rating: string;
}

interface IndividualDevelopmentPlan {
  technical: string;
  behavioral: string;
  functional: string;
}
interface LeadOption {
  id: number;
  name: string;
}
interface FormData {
  leadId: number[];
  selfAssessments: SelfAssessment[];
  performanceFactors: PerformanceFactor[];
  individualDevelopmentPlan: IndividualDevelopmentPlan;
  additionalRemarks: string;
}

interface EmployeeSelfAppraisalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, action: "draft" | "submit") => void;
  employeeData: EmployeeData;
  leadOptions: LeadOption[];
  isReadOnly?: boolean;
  initialData?: FormData;
  isSubmitted?: boolean;
  currentStatus?: string; // Added current status prop
}

const defaultFormData: FormData = {
  leadId: [],
  selfAssessments: [
    {
      deliveryDetails: "",
      accomplishments: "",
      approaches: "",
      improvements: "",
      timeFrame: "",
    },
  ],
  performanceFactors: [
    {
      competency: "Technical",
      strengths: "",
      improvementNeeds: "",
      rating: "",
    },
    {
      competency: "Functional",
      strengths: "",
      improvementNeeds: "",
      rating: "",
    },
    {
      competency: "Communication",
      strengths: "",
      improvementNeeds: "",
      rating: "",
    },
    {
      competency: "Energy & Drive",
      strengths: "",
      improvementNeeds: "",
      rating: "",
    },
    {
      competency: "Responsibilities & Trust",
      strengths: "",
      improvementNeeds: "",
      rating: "",
    },
    { competency: "Teamwork", strengths: "", improvementNeeds: "", rating: "" },
    {
      competency: "Managing Processes & Work",
      strengths: "",
      improvementNeeds: "",
      rating: "",
    },
  ],
  individualDevelopmentPlan: {
    technical: "",
    behavioral: "",
    functional: "",
  },
  additionalRemarks: "",
};

export default function EmployeeSelfAppraisalModal({
  isOpen,
  onClose,
  onSubmit,
  employeeData,
  leadOptions,
  isReadOnly = false,
  initialData,
  isSubmitted = false,
  currentStatus,
}: EmployeeSelfAppraisalModalProps) {
  const [showPopup, setShowPopup] = useState<null | string>(null);
  const [formData, setFormData] = useState<FormData>({ ...defaultFormData });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showChat, setShowChat] = useState(false);
  const hidePF_IDP_Remarks = currentStatus === "ALL_DONE";
  // console.log("Employeedata:", employeeData);

  // --- FIX: The useEffect logic was simplified to reliably load draft data ---
  // The previous complex logic failed to load data if only leads were selected.
  // This new version trusts the 'initialData' prop and loads it directly,
  // falling back to the default empty form only if 'initialData' is not provided.
  useEffect(() => {
    if (isOpen) {
      // If initialData is provided, use it. Otherwise, fall back to the default form data.
      const dataToLoad = initialData || defaultFormData;

      // Deep copy the data to ensure the modal has its own state and doesn't mutate props
      setFormData({
        leadId: [...(dataToLoad.leadId || [])],
        selfAssessments:
          dataToLoad.selfAssessments?.length > 0
            ? dataToLoad.selfAssessments.map((assessment) => ({ ...assessment }))
            : [{ ...defaultFormData.selfAssessments[0] }],
        performanceFactors:
          dataToLoad.performanceFactors?.length > 0
            ? dataToLoad.performanceFactors.map((factor) => ({ ...factor }))
            : [...defaultFormData.performanceFactors],
        individualDevelopmentPlan: {
          ...(dataToLoad.individualDevelopmentPlan ||
            defaultFormData.individualDevelopmentPlan),
        },
        additionalRemarks: dataToLoad.additionalRemarks || "",
      });

      // Always reset errors when the modal opens or data changes
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Lead selection
    if (formData.leadId.length === 0) {
      newErrors.leadId = "At least one lead must be selected";
    }

    // Self Assessments
    formData.selfAssessments.forEach((assessment, idx) => {
      if (!assessment.deliveryDetails)
        newErrors[`selfAssessments.${idx}.deliveryDetails`] = "Required";
      if (!assessment.accomplishments)
        newErrors[`selfAssessments.${idx}.accomplishments`] = "Required";
      if (!assessment.approaches)
        newErrors[`selfAssessments.${idx}.approaches`] = "Required";
      if (!assessment.improvements)
        newErrors[`selfAssessments.${idx}.improvements`] = "Required";
      if (!assessment.timeFrame)
        newErrors[`selfAssessments.${idx}.timeFrame`] = "Required";
    });

    // Performance Factors (only if visible)
    if (isSubmitted || isReadOnly) {
      formData.performanceFactors.forEach((factor, idx) => {
        if (!factor.strengths)
          newErrors[`performanceFactors.${idx}.strengths`] = "Required";
        if (!factor.improvementNeeds)
          newErrors[`performanceFactors.${idx}.improvementNeeds`] = "Required";
        if (!factor.rating)
          newErrors[`performanceFactors.${idx}.rating`] = "Required";
      });

      // Individual Development Plan
      if (!formData.individualDevelopmentPlan.technical)
        newErrors["individualDevelopmentPlan.technical"] = "Required";
      if (!formData.individualDevelopmentPlan.behavioral)
        newErrors["individualDevelopmentPlan.behavioral"] = "Required";
      if (!formData.individualDevelopmentPlan.functional)
        newErrors["individualDevelopmentPlan.functional"] = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canAddAssessment = formData.selfAssessments.every(
    (a) =>
      a.deliveryDetails &&
      a.accomplishments &&
      a.approaches &&
      a.improvements &&
      a.timeFrame
  );

  const addAssessment = () => {
    if (!canAddAssessment) return;
    setFormData((prev) => ({
      ...prev,
      selfAssessments: [
        ...prev.selfAssessments,
        {
          deliveryDetails: "",
          accomplishments: "",
          approaches: "",
          improvements: "",
          timeFrame: "",
        },
      ],
    }));
  };

  const removeAssessment = (index: number) => {
    if (formData.selfAssessments.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      selfAssessments: prev.selfAssessments.filter((_, i) => i !== index),
    }));
  };

  const handleAssessmentChange = (
    index: number,
    field: keyof SelfAssessment,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedAssessments = [...prev.selfAssessments];
      updatedAssessments[index] = {
        ...updatedAssessments[index],
        [field]: value,
      };
      return {
        ...prev,
        selfAssessments: updatedAssessments,
      };
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`selfAssessments.${index}.${field}`];
      return newErrors;
    });
  };

  const handlePerformanceFactorChange = (
    index: number,
    field: keyof PerformanceFactor,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedFactors = [...prev.performanceFactors];
      updatedFactors[index] = {
        ...updatedFactors[index],
        [field]: value,
      };
      return {
        ...prev,
        performanceFactors: updatedFactors,
      };
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`performanceFactors.${index}.${field}`];
      return newErrors;
    });
  };

  const handleDevelopmentPlanChange = (
    field: keyof IndividualDevelopmentPlan,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      individualDevelopmentPlan: {
        ...prev.individualDevelopmentPlan,
        [field]: value,
      },
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`individualDevelopmentPlan.${field}`];
      return newErrors;
    });
  };

  const handleLeadSelection = (leadId: number, checked: boolean) => {
    setFormData((prev) => {
      const updatedleadId = checked
        ? [...prev.leadId, leadId]
        : prev.leadId.filter((id) => id !== leadId);
      return {
        ...prev,
        leadId: updatedleadId,
      };
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.leadId;
      return newErrors;
    });
  };

  const removeLead = (leadId: number) => {
    setFormData((prev) => ({
      ...prev,
      leadId: prev.leadId.filter((id) => id !== leadId),
    }));
  };

  const handleSubmitForm = (action: "draft" | "submit") => {
    if (action === "submit" && !validateForm()) {
      return;
    }
    const dataToSubmit: FormData = {
      leadId: [...formData.leadId],
      selfAssessments: formData.selfAssessments.map((assessment) => ({
        ...assessment,
      })),
      performanceFactors: formData.performanceFactors.map((factor) => ({
        ...factor,
      })),
      individualDevelopmentPlan: { ...formData.individualDevelopmentPlan },
      additionalRemarks: formData.additionalRemarks,
    };
    onSubmit(dataToSubmit, action);
    setShowPopup(
      action === "draft"
        ? "Draft saved successfully!"
        : "Form submitted successfully!"
    );
    setTimeout(() => setShowPopup(null), 2000);
  };

  const handleClose = () => {
    onClose();
  };
  // console.log("Form Data:", formData);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-none !w-[90vw] !h-[90vh] overflow-y-auto">
        {/* <ChatBotLauncher/> */}
        <DialogHeader>
          <DialogTitle>
            {isReadOnly
              ? "Performance Appraisal Form"
              : "Employee Self Appraisal"}
          </DialogTitle>
        </DialogHeader>

        {/* Employee Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
          <EmployeeDetails employeeData={employeeData} />
        </div>

        {/* Lead Selection */}
        <div className="mb-6">
          <div className="mb-4">
            {/* {!isReadOnly && ( */}
            {!isReadOnly && (
              <>
                <h3 className="text-lg font-semibold mb-2">Select Lead(s)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg">
                  {leadOptions.map((lead) => (
                    <div key={lead.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lead-${lead.id}`}
                        checked={formData.leadId.includes(lead.id)}
                        onCheckedChange={(checked) =>
                          handleLeadSelection(lead.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`lead-${lead.id}`}
                        className="text-sm font-medium"
                      >
                        {lead.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </>
            )}
            {errors.leadId && (
              <p className="text-xs text-red-500 mt-1">{errors.leadId}</p>
            )}
            {/* Selected Leads Display */}
            {formData.leadId.length > 0 && (
              <div className="mt-3">
                <Label className="text-sm text-gray-600">
                  Selected Lead(s):
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.leadId.map((id) => {
                    const lead = leadOptions.find((l) => l.id === id);
                    return <Badge key={id}>{lead?.name || id}</Badge>;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 1. Employee Self Assessment */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Employee Self Assessment</h3>
            {!isReadOnly && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAssessment}
                disabled={!canAddAssessment}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Assessment
              </Button>
            )}
          </div>

          <AddAssessment
            assessments={formData.selfAssessments}
            isReadOnly={isReadOnly}
            errors={errors}
            onChange={handleAssessmentChange}
            onRemove={removeAssessment}
          />
        </div>

        {/* 2. Performance Factors - Only show if submitted or read-only */}
        {hidePF_IDP_Remarks && isReadOnly && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance Factors</h3>
            <PerformanceFactors
              performanceFactors={formData.performanceFactors}
              isReadOnly={isReadOnly}
              errors={errors}
              handlePerformanceFactorChange={handlePerformanceFactorChange}
            />
          </div>
        )}

        {/* 3. Individual Development Plan - Only show if submitted or read-only */}
        {hidePF_IDP_Remarks && isReadOnly && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Individual Development Plan (IDP)
            </h3>
            <IndividualDevelopmentPlanTable
              plan={formData.individualDevelopmentPlan}
              isReadOnly={isReadOnly}
              errors={errors}
              onChange={handleDevelopmentPlanChange}
            />
          </div>
        )}

        {/* 4. Additional Remarks - Only show if submitted or read-only */}
        {isReadOnly && hidePF_IDP_Remarks && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Additional Remarks</h3>
            {isReadOnly ? (
              <p className="p-4 bg-gray-50 rounded min-h-[100px]">
                {formData.additionalRemarks || "No additional remarks"}
              </p>
            ) : (
              <Textarea
                value={formData.additionalRemarks}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalRemarks: e.target.value,
                  }))
                }
                placeholder="Optional remarks..."
                className="min-h-[100px]"
              />
            )}
          </div>
        )}

        {!isReadOnly && (
          <div className="flex justify-end gap-2 pt-4 border-t mr-24">
            {!isSubmitted ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSubmitForm("draft")}
                  type="button"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSubmitForm("submit")}
                  type="button"
                >
                  Submit Appraisal
                </Button>
              </>
            ) : (
              <Button onClick={() => handleSubmitForm("submit")} type="button">
                Update Appraisal
              </Button>
            )}
          </div>
        )}
        <div></div>
      </DialogContent>
    </Dialog>
  );
}