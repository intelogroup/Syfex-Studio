import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PortfolioSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((item) => (
      <Card key={item} className="bg-card/50 backdrop-blur-sm border-muted">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full aspect-video rounded-lg" />
          <Skeleton className="h-4 w-1/2 mt-4" />
        </CardContent>
      </Card>
    ))}
  </div>
);