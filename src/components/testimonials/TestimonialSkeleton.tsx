import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((item) => (
      <Card key={item} className="h-full bg-black/40 backdrop-blur-sm border-primary/10">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="w-10 h-10 rounded" />
            <Skeleton className="w-24 h-5" />
          </div>
          <Skeleton className="h-20 w-full mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);