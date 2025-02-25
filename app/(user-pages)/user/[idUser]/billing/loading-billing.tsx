import { Card, Skeleton } from "@heroui/react";
import { Spacer } from "@heroui/spacer";

export default function BillingSkeleton() {
  return (
    <div className="container mx-auto p-4 h-screen">
      <Skeleton className="h-10 w-[370px] mx-auto space-y-20 shadow-lg rounded-lg bg-default-300"></Skeleton>
      <Spacer y={2} />
      {[...Array(3)].map(() => (
        <Card className="h-[170px] p-6 my-4 mx-auto max-w-2xl shadow-lg rounded-lg border border-[#262626] text-white">
            <div className="grid md:grid-cols-1 gap-6">
                <div className="flex justify-between">
                    <Skeleton className="h-7 w-[450px] space-y-20 rounded-lg bg-default-300" />
                    <Skeleton className="h-7 w-[80px] rounded-lg" />
                </div>
            </div>
            <Spacer y={4} />
            <Skeleton className="h-8 w-[170px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={4} />
            <Skeleton className="h-5 w-[180px] space-y-20 rounded-lg bg-default-300" />
        </Card>
      ))}
    </div>
  );
}
