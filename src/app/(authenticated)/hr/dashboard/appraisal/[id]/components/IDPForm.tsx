"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Save, X, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useGetAppraisalByIdQuery } from "@/api-service/appraisal/appraisal.api";
import { Skeleton } from "@/components/ui/skeleton";

interface IDPItem {
  id: number;
  competency: string;
  technical_objective: string;
  technical_plan: string;
}

interface IdpModalProps {
  isOpen: boolean;
  onClose: () => void;
  appraisalId: string;
}

const competencyDisplay: Record<string, string> = {
  TECHNICAL: "Technical",
  FUNCTIONAL: "Functional",
  BEHAVIORAL: "Behavioral",
  COMMUNICATION: "Communication",
  "ENERGY & DRIVE": "Energy & Drive",
  "RESPONSIBILITY & TRUST": "Responsibility & Trust",
  TEAMWORK: "Teamwork",
  "MANAGING PROCESSES & WORK": "Managing Processes & Work",
};

const IdpModal = ({ isOpen, onClose, appraisalId }: IdpModalProps) => {
  const { data: appraisalData, isLoading } =
    useGetAppraisalByIdQuery(appraisalId);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<IDPItem[]>([]);

  useEffect(() => {
    if (appraisalData?.idp) {
      setEditedData(appraisalData.idp);
    }
  }, [appraisalData]);

  const handleFieldChange = (
    id: number,
    field: keyof IDPItem,
    value: string
  ) => {
    setEditedData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    console.log("IDP Data to submit:", editedData);
    toast.success("IDP changes saved (check console)");
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedData(appraisalData?.idp || []);
    setEditMode(false);
    onClose();
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      setEditedData(appraisalData?.idp || []);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-h-[90vh] overflow-auto min-w-[70%] ">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-semibold">
              Individual Development Plan
              {appraisalData?.employee?.name && (
                <span className="text-gray-600 ml-2">
                  - {appraisalData.employee.name}
                </span>
              )}
            </DialogTitle>
            <div className="flex gap-3">
              <Button
                variant={editMode ? "outline" : "default"}
                size="sm"
                onClick={toggleEditMode}
                className="gap-2"
              >
                {editMode ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancel Edit
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit IDP
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-6 py-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : editedData.length > 0 ? (
          <div className="space-y-6 py-4">
            {editedData.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-6 bg-white shadow-sm"
              >
                <div className="mb-5">
                  <Badge
                    variant="secondary"
                    className="px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-700"
                  >
                    {competencyDisplay[item.competency] || item.competency}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Development Objective
                    </Label>
                    {editMode ? (
                      <Textarea
                        value={item.technical_objective}
                        onChange={(e) =>
                          handleFieldChange(
                            item.id,
                            "technical_objective",
                            e.target.value
                          )
                        }
                        placeholder="What do you want to achieve?"
                        className="min-h-[120px]"
                      />
                    ) : (
                      <div className="p-3 border rounded-lg bg-gray-50 min-h-[120px] text-gray-800">
                        {item.technical_objective || (
                          <span className="text-gray-400">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Action Plan
                    </Label>
                    {editMode ? (
                      <Textarea
                        value={item.technical_plan}
                        onChange={(e) =>
                          handleFieldChange(
                            item.id,
                            "technical_plan",
                            e.target.value
                          )
                        }
                        placeholder="How will you achieve it?"
                        className="min-h-[120px]"
                      />
                    ) : (
                      <div className="p-3 border rounded-lg bg-gray-50 min-h-[120px] text-gray-800">
                        {item.technical_plan || (
                          <span className="text-gray-400">Not specified</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl bg-gray-50">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No IDP Data Found
            </h3>
            <p className="text-gray-500 mb-4 text-center max-w-md">
              This employee hasn't created an IDP yet.
            </p>
          </div>
        )}

        {editMode && (
          <DialogFooter className="border-t pt-4">
            <div className="flex justify-end gap-3 w-full">
              <Button variant="outline" onClick={handleCancel}>
                Discard Changes
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save All Changes
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IdpModal;
