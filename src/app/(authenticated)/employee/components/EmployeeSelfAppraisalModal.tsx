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
import ChatBot from "./chatbot";
import { MessageCircle } from "lucide-react";
import ChatBotLauncher from "./chatbotlauncher";
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

interface FormData {
  leadNames: string[];
  selfAssessments: SelfAssessment[];
  performanceFactors: PerformanceFactor[];
  individualDevelopmentPlan: IndividualDevelopmentPlan;
  additionalRemarks: string;
}

interface EmployeeSelfAppraisalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, action: "save" | "submit") => void;
  employeeData: EmployeeData;
  leadOptions: string[];
  isReadOnly?: boolean;
  initialData?: FormData;
  isSubmitted?: boolean;
}

const defaultFormData: FormData = {
  leadNames: [],
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
}: EmployeeSelfAppraisalModalProps) {
  const [formData, setFormData] = useState<FormData>({ ...defaultFormData });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          leadNames: [...(initialData.leadNames || [])],
          selfAssessments: initialData.selfAssessments?.map((assessment) => ({
            ...assessment,
          })) || [{ ...defaultFormData.selfAssessments[0] }],
          performanceFactors: initialData.performanceFactors?.map((factor) => ({
            ...factor,
          })) || [...defaultFormData.performanceFactors],
          individualDevelopmentPlan: {
            ...(initialData.individualDevelopmentPlan ||
              defaultFormData.individualDevelopmentPlan),
          },
          additionalRemarks: initialData.additionalRemarks || "",
        });
      } else {
        setFormData({ ...defaultFormData });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Lead selection
    if (formData.leadNames.length === 0) {
      newErrors.leadNames = "At least one lead must be selected";
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

  const handleLeadSelection = (leadName: string, checked: boolean) => {
    setFormData((prev) => {
      const updatedLeadNames = checked
        ? [...prev.leadNames, leadName]
        : prev.leadNames.filter((name) => name !== leadName);
      return {
        ...prev,
        leadNames: updatedLeadNames,
      };
    });
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.leadNames;
      return newErrors;
    });
  };

  const removeLead = (leadName: string) => {
    setFormData((prev) => ({
      ...prev,
      leadNames: prev.leadNames.filter((name) => name !== leadName),
    }));
  };

  const handleSubmitForm = (action: "save" | "submit") => {
    if (action === "submit" && !validateForm()) {
      return;
    }
    const dataToSubmit: FormData = {
      leadNames: [...formData.leadNames],
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
  };

  const handleClose = () => {
    onClose();
  };

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
          <div>
            <Label className="text-gray-500">Employee Name</Label>
            <p className="font-medium">{employeeData.name}</p>
          </div>
          <div>
            <Label className="text-gray-500">Department</Label>
            <p className="font-medium">{employeeData.designation}</p>
          </div>
          <div>
            <Label className="text-gray-500">Employee Number</Label>
            <p className="font-medium">{employeeData.employeeNumber}</p>
          </div>
          <div>
            <Label className="text-gray-500">Team</Label>
            <p className="font-medium">{employeeData.team}</p>
          </div>
        </div>

        {/* Lead Selection */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Select Lead(s)</h3>
            {!isReadOnly && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg">
                {leadOptions.map((lead) => (
                  <div key={lead} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lead-${lead}`}
                      checked={formData.leadNames.includes(lead)}
                      onCheckedChange={(checked) =>
                        handleLeadSelection(lead, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`lead-${lead}`}
                      className="text-sm font-medium"
                    >
                      {lead}
                    </Label>
                  </div>
                ))}
              </div>
            )}
            {errors.leadNames && (
              <p className="text-xs text-red-500 mt-1">{errors.leadNames}</p>
            )}
            {/* Selected Leads Display */}
            {formData.leadNames.length > 0 && (
              <div className="mt-3">
                <Label className="text-sm text-gray-600">
                  Selected Lead(s):
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.leadNames.map((leadName) => (
                    <Badge
                      key={leadName}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {leadName}
                      {!isReadOnly && (
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeLead(leadName)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {formData.leadNames.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {isReadOnly
                  ? "No leads selected"
                  : "Please select at least one lead"}
              </p>
            )}
          </div>
        </div>

        {/* 1. Employee Self Assessment */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              1. Employee Self Assessment
            </h3>
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">SN</TableHead>
                <TableHead>Delivery Details</TableHead>
                <TableHead>Highlights of Accomplishments</TableHead>
                <TableHead>Approach/Solution taken</TableHead>
                <TableHead>Improvement possibilities</TableHead>
                <TableHead>Time frame</TableHead>
                {!isReadOnly && (
                  <TableHead className="w-[50px]">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.selfAssessments.map((assessment, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {assessment.deliveryDetails || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={assessment.deliveryDetails}
                          onChange={(e) =>
                            handleAssessmentChange(
                              index,
                              "deliveryDetails",
                              e.target.value
                            )
                          }
                          placeholder="Enter delivery details..."
                          className="min-h-[80px]"
                        />
                        {errors[`selfAssessments.${index}.deliveryDetails`] && (
                          <p className="text-xs text-red-500">
                            {errors[`selfAssessments.${index}.deliveryDetails`]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {assessment.accomplishments || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={assessment.accomplishments}
                          onChange={(e) =>
                            handleAssessmentChange(
                              index,
                              "accomplishments",
                              e.target.value
                            )
                          }
                          placeholder="Enter accomplishments..."
                          className="min-h-[80px]"
                        />
                        {errors[`selfAssessments.${index}.accomplishments`] && (
                          <p className="text-xs text-red-500">
                            {errors[`selfAssessments.${index}.accomplishments`]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {assessment.approaches || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={assessment.approaches}
                          onChange={(e) =>
                            handleAssessmentChange(
                              index,
                              "approaches",
                              e.target.value
                            )
                          }
                          placeholder="Enter approach/solution..."
                          className="min-h-[80px]"
                        />
                        {errors[`selfAssessments.${index}.approaches`] && (
                          <p className="text-xs text-red-500">
                            {errors[`selfAssessments.${index}.approaches`]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {assessment.improvements || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={assessment.improvements}
                          onChange={(e) =>
                            handleAssessmentChange(
                              index,
                              "improvements",
                              e.target.value
                            )
                          }
                          placeholder="Enter improvement possibilities..."
                          className="min-h-[80px]"
                        />
                        {errors[`selfAssessments.${index}.improvements`] && (
                          <p className="text-xs text-red-500">
                            {errors[`selfAssessments.${index}.improvements`]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {assessment.timeFrame || "-"}
                      </p>
                    ) : (
                      <>
                        <Input
                          value={assessment.timeFrame}
                          onChange={(e) =>
                            handleAssessmentChange(
                              index,
                              "timeFrame",
                              e.target.value
                            )
                          }
                          placeholder="Enter time frame..."
                        />
                        {errors[`selfAssessments.${index}.timeFrame`] && (
                          <p className="text-xs text-red-500">
                            {errors[`selfAssessments.${index}.timeFrame`]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                  {!isReadOnly && (
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAssessment(index)}
                        disabled={formData.selfAssessments.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 2. Performance Factors - Only show if submitted or read-only */}
        {(isSubmitted || isReadOnly) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              2. Performance Factors
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">SN</TableHead>
                  <TableHead>Competencies</TableHead>
                  <TableHead>Strengths</TableHead>
                  <TableHead>Improvement Needs</TableHead>
                  <TableHead>Rating (1-10)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.performanceFactors.map((factor, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {factor.competency}
                    </TableCell>
                    <TableCell>
                      {isReadOnly ? (
                        <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                          {factor.strengths || "-"}
                        </p>
                      ) : (
                        <>
                          <Textarea
                            value={factor.strengths}
                            onChange={(e) =>
                              handlePerformanceFactorChange(
                                index,
                                "strengths",
                                e.target.value
                              )
                            }
                            placeholder="Enter strengths..."
                            className="min-h-[80px]"
                          />
                          {errors[`performanceFactors.${index}.strengths`] && (
                            <p className="text-xs text-red-500">
                              {errors[`performanceFactors.${index}.strengths`]}
                            </p>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      {isReadOnly ? (
                        <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                          {factor.improvementNeeds || "-"}
                        </p>
                      ) : (
                        <>
                          <Textarea
                            value={factor.improvementNeeds}
                            onChange={(e) =>
                              handlePerformanceFactorChange(
                                index,
                                "improvementNeeds",
                                e.target.value
                              )
                            }
                            placeholder="Enter improvement needs..."
                            className="min-h-[80px]"
                          />
                          {errors[
                            `performanceFactors.${index}.improvementNeeds`
                          ] && (
                            <p className="text-xs text-red-500">
                              {
                                errors[
                                  `performanceFactors.${index}.improvementNeeds`
                                ]
                              }
                            </p>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      {isReadOnly ? (
                        <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                          {factor.rating || "-"}
                        </p>
                      ) : (
                        <>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={factor.rating}
                            onChange={(e) =>
                              handlePerformanceFactorChange(
                                index,
                                "rating",
                                e.target.value
                              )
                            }
                            placeholder="1-10"
                          />
                          {errors[`performanceFactors.${index}.rating`] && (
                            <p className="text-xs text-red-500">
                              {errors[`performanceFactors.${index}.rating`]}
                            </p>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* 3. Individual Development Plan - Only show if submitted or read-only */}
        {(isSubmitted || isReadOnly) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              3. Individual Development Plan (IDP)
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Individual Objectives</TableHead>
                  <TableHead>Development plan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Technical</TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {formData.individualDevelopmentPlan.technical || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={formData.individualDevelopmentPlan.technical}
                          onChange={(e) =>
                            handleDevelopmentPlanChange(
                              "technical",
                              e.target.value
                            )
                          }
                          placeholder="Enter technical development plan..."
                          className="min-h-[80px]"
                        />
                        {errors["individualDevelopmentPlan.technical"] && (
                          <p className="text-xs text-red-500">
                            {errors["individualDevelopmentPlan.technical"]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Behavioral</TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {formData.individualDevelopmentPlan.behavioral || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={formData.individualDevelopmentPlan.behavioral}
                          onChange={(e) =>
                            handleDevelopmentPlanChange(
                              "behavioral",
                              e.target.value
                            )
                          }
                          placeholder="Enter behavioral development plan..."
                          className="min-h-[80px]"
                        />
                        {errors["individualDevelopmentPlan.behavioral"] && (
                          <p className="text-xs text-red-500">
                            {errors["individualDevelopmentPlan.behavioral"]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Functional</TableCell>
                  <TableCell>
                    {isReadOnly ? (
                      <p className="p-2 bg-gray-50 rounded min-h-[40px]">
                        {formData.individualDevelopmentPlan.functional || "-"}
                      </p>
                    ) : (
                      <>
                        <Textarea
                          value={formData.individualDevelopmentPlan.functional}
                          onChange={(e) =>
                            handleDevelopmentPlanChange(
                              "functional",
                              e.target.value
                            )
                          }
                          placeholder="Enter functional development plan..."
                          className="min-h-[80px]"
                        />
                        {errors["individualDevelopmentPlan.functional"] && (
                          <p className="text-xs text-red-500">
                            {errors["individualDevelopmentPlan.functional"]}
                          </p>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {/* 4. Additional Remarks - Only show if submitted or read-only */}
        {(isSubmitted || isReadOnly) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              4. Additional Remarks
            </h3>
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
                  onClick={() => handleSubmitForm("save")}
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
        <div>
        {/* Floating Chatbot Button */}
        {/* {!showChat && (
          <Button
            className="fixed bottom-10 right-10 z-50 rounded-full shadow-lg h-12 w-12 p-0 flex items-center justify-center"
            onClick={() => setShowChat(true)}
            variant="secondary"
            style={{ borderRadius: "50%" }}
            aria-label="Open Chatbot"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )} */}

        {/* Chatbot Panel inside Modal */}
        {/* {showChat && (
          <div className="fixed bottom-24 right-10 z-50 w-80">
            <ChatBot />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => setShowChat(false)}
            >
              <X></X>
            </Button>
          </div>
        )} */}
      </div>
      </DialogContent>
      
    </Dialog>
  );
}