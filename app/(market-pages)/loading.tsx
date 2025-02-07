import {Card, Skeleton} from "@heroui/react";

export default function TableSkeleton() {

    return (
        <div className="px-10 py-4">
            <Skeleton className="h-10 w-[320px] space-y-10 rounded-lg bg-default-300" />
            <br></br>
            <Card className="w-full p-4 space-y-3">
            <Skeleton className="h-10 w-full rounded-lg bg-default-300" />
            <div className="space-y-5">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="flex space-x-2">
                <Skeleton className="h-6 w-1/5 rounded-lg bg-default-200" />
                <Skeleton className="h-6 w-1/5 rounded-lg bg-default-200" />
                <Skeleton className="h-6 w-2/5 rounded-lg bg-default-300" />
                <Skeleton className="h-6 w-2/5 rounded-lg bg-default-300" />
                <Skeleton className="h-6 w-1/5 rounded-lg bg-default-300" />
                </div>
            ))}
            </div>
        </Card>
      </div>
    );
  }