"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, CheckCircle2, Clock, Plus } from "lucide-react"; // Changed to Plus from PlusIcon
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, SkeletonGrid } from "@/components/ui/skeleton-grid";
import { useRouter } from "next/navigation";
import AppraisalCycleModal from "@/components/hr/AppraisalCycleForm";
import {
  useGetCyclesQuery,
  useUpdateCycleMutation,
} from "@/api-service/appraisalCycle/appraisalCycle.api";
import { AppraisalCycle } from "@/api-service/appraisalCycle/types";
import { toast } from "sonner";
import { formatDate, getProgressColorClass } from "@/components/functions";
import { useGetMetricsQuery } from "@/api-service/dashboardMetrics/dashboardMetrics.api";
import { MetricCard } from "@/components/common/metic-card";
import { cn } from "@/lib/utils"; // Import cn for merging classes
import Header from "@/components/common/section-header";

// New helper function for glassmorphism-style badges
const getGlassStatusStyles = (status: string) => {
  switch (status) {
    case "INITIATED":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
    case "IN_PROGRESS":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "COMPLETED":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

const getProgressFromStatus = (status: string): number => {
  switch (status) {
    case "INITIATED":
      return 10;
    case "IN_PROGRESS":
      return 50;
    case "COMPLETED":
      return 100;
    default:
      return 0;
  }
};

const Index = () => {
  const router = useRouter();
  const { data, isLoading } = useGetCyclesQuery();
  const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeCycleModal, setCloseCycleModal] = useState<{
    open: boolean;
    cycleId: number | null;
  }>({ open: false, cycleId: null });

  const [updateCycle] = useUpdateCycleMutation();
  const { data: metricsData } = useGetMetricsQuery();

  useEffect(() => {
    if (data) {
      setAppraisalCycles(data);
    }
  }, [data]);

  const handleCloseCycle = (cycleId: number) => {
    setCloseCycleModal({ open: true, cycleId: cycleId });
  };

  const confirmCloseCycle = (cycleId: number) => {
    updateCycle({ id: cycleId, status: "COMPLETED" })
      .unwrap()
      .then(() => toast.success("Cycle closed successfully"))
      .catch((error) =>
        toast.error(error?.data?.message || "Cycle close failed")
      );
    setCloseCycleModal({ open: false, cycleId: null });
  };

  if (isLoading) {
    // --- UPDATED SKELETON LOADER ---
    return (
      <div className="bg-gradient-to-b from-[#001A24] to-[#004A5E] h-[90vh] overflow-y-auto p-6 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 bg-white/10" />
            <Skeleton className="h-6 w-80 bg-white/10" />
          </div>
          <Skeleton className="h-10 w-32 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[108px] rounded-2xl bg-white/10" />
          ))}
        </div>

        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <Skeleton className="h-8 w-48 mb-6 bg-white/10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Appraisal Management"
        subtitle="Streamline your performance review process"
        endAddon={
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-opacity rounded-lg"
          >
            <Plus className="h-4 w-4" />
            Add Cycle
          </Button>
        }
      />
      {/* --- METRIC CARDS (already styled correctly) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Employees"
          value={metricsData?.totalEmployees || 0}
          icon={Users}
          color="green"
        />
        <MetricCard
          title="Completed Reviews"
          value={metricsData?.completedAppraisals || 0}
          icon={CheckCircle2}
          color="purple"
        />
        <MetricCard
          title="Pending Actions"
          value={metricsData?.pendingAppraisals || 0}
          icon={Clock}
          color="orange"
        />
      </div>
      {/* --- UPDATED APPRAISAL CYCLES CONTAINER CARD --- */}
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Appraisal Cycles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appraisalCycles?.map((cycle) => (
              // --- UPDATED INDIVIDUAL CYCLE CARD ---
              <Card
                key={cycle.id}
                className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 rounded-xl"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-white">
                        {cycle.name}
                      </CardTitle>
                      <CardDescription className="text-white/60">
                        {formatDate(cycle.start_date)} -{" "}
                        {formatDate(cycle.end_date)}
                      </CardDescription>
                    </div>
                    <Badge
                      className={cn(
                        "border font-medium capitalize",
                        getGlassStatusStyles(cycle.status)
                      )}
                    >
                      {cycle.status.replace("_", " ").toLowerCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress
                      value={getProgressFromStatus(cycle.status)}
                      className="h-2 [&>div]:rounded-full"
                      indicatorClassName={getProgressColorClass(
                        getProgressFromStatus(cycle.status)
                      )}
                    />
                    <div className="flex gap-2 justify-between items-center">
                      <div className="flex gap-2">
                        {cycle.status === "COMPLETED" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.push(
                                `hr/dashboard/past-appraisal/${cycle.id}`
                              )
                            }
                            className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white rounded-lg"
                          >
                            View Details
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() =>
                              router.push(`hr/appraisal/${cycle.id}`)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                          >
                            Manage
                          </Button>
                        )}
                      </div>
                      {cycle.status !== "COMPLETED" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCloseCycle(cycle.id)}
                          className="dark:bg-red-900 text-red-300 hover:bg-red-900/80 border border-red-500/30 rounded-lg"
                        >
                          Close Cycle
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AppraisalCycleModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={() => console.log("Save Cycle")}
      />
      {/* The Dialog will inherit backdrop blur, but we can style its content too */}
      <Dialog
        open={closeCycleModal.open}
        onOpenChange={(open) =>
          setCloseCycleModal({ open, cycleId: closeCycleModal.cycleId })
        }
      >
        <DialogContent className="bg-gray-900/80 backdrop-blur-lg border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Close Appraisal Cycle</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you sure? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCloseCycleModal({ open: false, cycleId: null })}
              className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmCloseCycle(closeCycleModal.cycleId!)}
            >
              Close Cycle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
