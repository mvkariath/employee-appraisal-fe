// components/ui/skeleton-grid.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardDescription, CardContent } from "./card";

interface SkeletonGridProps {
  parentComponent: string;
  gridStructure: string;
  children: React.ReactNode;
}

export const SkeletonGrid = ({
  parentComponent,
  gridStructure,
  children,
}: SkeletonGridProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className={gridStructure}>{children}</div>
    </div>
  );
};

export const CardSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-2 w-full" />
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
    </CardContent>
  </Card>
);
