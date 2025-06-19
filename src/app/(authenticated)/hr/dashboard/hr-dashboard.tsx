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
import { Users, CheckCircle2, Clock, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonGrid, CardSkeleton } from "@/components/ui/skeleton-grid";

import { usePathname, useRouter } from "next/navigation";
import AppraisalCycleModal from "@/components/hr/AppraisalCycleForm";
import {
  useGetCyclesQuery,
  useUpdateCycleMutation,
} from "@/api-service/appraisalCycle/appraisalCycle.api";
import { AppraisalCycle } from "@/api-service/appraisalCycle/types";
import { toast } from "sonner";
import { formatDate, getProgressColorClass } from "@/components/functions";
import { useGetMetricsQuery } from "@/api-service/dashboardMetrics/dashboardMetrics.api";

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useGetCyclesQuery();
  const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeCycleModal, setCloseCycleModal] = useState<{
    open: boolean;
    cycleId: number | null;
  }>({ open: false, cycleId: null });

  const [updateCycle] = useUpdateCycleMutation();
  const {data : metricsData} = useGetMetricsQuery()

  useEffect(() => {
    if (data) {
      setAppraisalCycles(data);
    }
  }, [data]);

  const handleCloseCycle = (cycleId: number) => {
    setCloseCycleModal({ open: true, cycleId: cycleId });
  };

  const confirmCloseCycle = (cycleId: number) => {
    const payload = {
      id: cycleId,
      status: "COMPLETED",
    };

    updateCycle(payload)
      .unwrap()
      .then(() => {
        toast.success("cycle closed successfully");
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Cycle close failed");
      });
    setCloseCycleModal({ open: false, cycleId: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "INITIATED":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  if (isLoading) {
    return (
      <Card className="bg-gray-200 h-[90vh] overflow-y-auto rounded-md dark:bg-gray-800">
        <CardHeader className="px-6 pt-6 pb-0">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-6 w-80" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </CardHeader>

        <CardContent className="w-full mx-auto px-6 py-8">
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Appraisal Cycles Skeleton */}
          <SkeletonGrid
            parentComponent="AppraisalCyclesPage"
            gridStructure="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {[1, 2, 3, 4].map((item) => (
              <CardSkeleton key={item} />
            ))}
          </SkeletonGrid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 bg-gray-100 h-[90vh] overflow-y-auto rounded-md dark:bg-gray-800">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
              Appraisal Management
            </CardTitle>
            <CardDescription className="text-lg">
              Streamline your performance review process
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center"
          >
            <PlusIcon />
            Add Cycle
          </Button>
        </div>
      </CardHeader>

      <CardContent className="w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Employees</p>
                  <p className="text-3xl font-bold">{metricsData.totalEmployees || 0}</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Completed Reviews</p>
                  <p className="text-3xl font-bold">{metricsData.completedAppraisals || 0}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Pending Actions</p>
                  <p className="text-3xl font-bold">{metricsData.pendingAppraisals || 0}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Appraisal Cycles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {appraisalCycles?.map((cycle) => (
                <Card
                  key={cycle.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{cycle.name}</CardTitle>
                        <CardDescription>
                          {formatDate(cycle.start_date)} -{" "}
                          {formatDate(cycle.end_date)}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(cycle.status)}>
                        {cycle.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress
                        value={getProgressFromStatus(cycle.status)}
                        className={getProgressColorClass(
                          getProgressFromStatus(cycle.status)
                        )}
                      />
                      <div className="flex gap-2 justify-between items-center">
                        <div className="flex gap-2">
                          {cycle.status === 'COMPLETED' && (
                            <Button size="sm" variant="outline"
                            onClick={() =>
                                router.push(
                                  `hr/dashboard/past-appraisal/${cycle.id}`
                                )
                              }>
                            View Details
                          </Button>
                          )}
                          {cycle.status !== "COMPLETED" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `hr/dashboard/appraisal/${cycle.id}`
                                )
                              }
                              variant="default"
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
          </CardContent>
        </Card>
      </CardContent>

      <AppraisalCycleModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={() => console.log("Save Cycle")}
      />

      <Dialog
        open={closeCycleModal.open}
        onOpenChange={(open) =>
          setCloseCycleModal({ open, cycleId: closeCycleModal.cycleId })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close Appraisal Cycle</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this appraisal cycle? This action
              cannot be undone and the cycle will no longer be manageable.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCloseCycleModal({ open: false, cycleId: null })}
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
    </Card>
  );
};

export default Index;
