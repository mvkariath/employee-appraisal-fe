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
import {
  useGetAppraisalByIdQuery,
  useUpdateAppraisalMutation,
} from "@/api-service/appraisal/appraisal.api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// --- TYPE & DATA DEFINITIONS ---
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

// --- HELPER & SKELETON COMPONENTS ---
const IdpSkeleton = () => (
  <div className="space-y-6 p-8 animate-pulse">
    {[...Array(2)].map((_, i) => (
      <div
        key={i}
        className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
      >
        <Skeleton className="h-7 w-32 rounded-full bg-white/10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-white/10" />
            <Skeleton className="h-24 w-full bg-white/10 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-white/10" />
            <Skeleton className="h-24 w-full bg-white/10 rounded-lg" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-black/20 border border-dashed border-white/20 rounded-xl m-8">
    <FileText className="h-10 w-10 text-white/40 mb-4" />
    <h3 className="text-lg font-semibold text-white mb-1">No IDP Data Found</h3>
    <p className="text-white/60 max-w-sm">
      This employee has not created an Individual Development Plan yet.
    </p>
  </div>
);

// --- MAIN MODAL COMPONENT ---
const IdpModal = ({ isOpen, onClose, appraisalId }: IdpModalProps) => {
  const { data: appraisalData, isLoading } = useGetAppraisalByIdQuery(
    appraisalId,
    { skip: !appraisalId }
  );
  const [updateAppraisal, { isLoading: isUpdating }] =
    useUpdateAppraisalMutation();

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<IDPItem[]>([]);

  useEffect(() => {
    if (appraisalData?.idp) {
      setEditedData(appraisalData.idp);
    } else {
      setEditedData([]);
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
    const id = parseInt(appraisalId, 10);
    updateAppraisal({ id, data: { idp: editedData } })
      .unwrap()
      .then(() => {
        toast.success("IDP updated successfully");
        setEditMode(false);
        onClose();
      })
      .catch((error) => {
        toast.error(error?.data?.message || "IDP update failed");
      });
  };

  const handleCancel = () => {
    setEditedData(appraisalData?.idp || []);
    setEditMode(false);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode); // This flips the 'editMode' state from true to false, or false to true.
    if (editMode) {
      // If we are *exiting* edit mode, reset the data to its original state.
      setEditedData(appraisalData?.idp || []);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="min-w-[70%] max-h-[90vh] overflow-hidden flex flex-col p-0
                                bg-[#002A35]/80 backdrop-blur-xl border border-white/10 
                                text-white rounded-2xl shadow-2xl"
      >
        <DialogHeader className="p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-semibold">
              Individual Development Plan
              {appraisalData?.employee?.name && (
                <span className="text-white/70 ml-2">
                  - {appraisalData.employee.name}
                </span>
              )}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={toggleEditMode}
                className={cn(
                  "gap-2 rounded-lg",
                  editMode
                    ? "bg-red-900/50 text-red-300 hover:bg-red-900/80 border border-red-500/30"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                )}
              >
                {editMode ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Edit className="h-4 w-4" />
                )}
                {editMode ? "Cancel Edit" : "Edit IDP"}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <IdpSkeleton />
          ) : editedData.length > 0 ? (
            <div className="space-y-6 p-8">
              {editedData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="mb-4">
                    <Badge className="bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {competencyDisplay[item.competency] || item.competency}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-medium text-white/80">
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
                          className="min-h-[120px] bg-black/20 border-white/20 rounded-lg text-white placeholder:text-white/40"
                        />
                      ) : (
                        <div className="p-3 border border-white/10 rounded-lg bg-black/20 min-h-[120px] text-white/90 whitespace-pre-wrap">
                          {item.technical_objective || (
                            <span className="text-white/50">Not specified</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-white/80">
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
                          className="min-h-[120px] bg-black/20 border-white/20 rounded-lg text-white placeholder:text-white/40"
                        />
                      ) : (
                        <div className="p-3 border border-white/10 rounded-lg bg-black/20 min-h-[120px] text-white/90 whitespace-pre-wrap">
                          {item.technical_plan || (
                            <span className="text-white/50">Not specified</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        {editMode && (
          <DialogFooter className="p-6 border-t border-white/10 flex-shrink-0">
            <div className="flex justify-end gap-3 w-full">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-opacity rounded-lg"
              >
                <Save className="h-4 w-4" />
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IdpModal;
