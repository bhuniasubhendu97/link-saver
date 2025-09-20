import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LibrarySkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-11 flex-grow" />
        <Skeleton className="h-11 w-full md:w-[220px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="w-full aspect-video rounded-t-lg" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/5" />
              </div>
              <Skeleton className="h-4 w-full pt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-2" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
