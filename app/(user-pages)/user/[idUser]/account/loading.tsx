import {Card, Skeleton} from "@heroui/react";
import {Spacer} from "@heroui/spacer";

export default function UserPageSkeleton() {

    return (
      <div>
        <div className="flex flex-col md:flex-row gap-4 px-10 py-4">
            <div className="flex-1">
              <Card className="border-gray-800 p-4 max-h-[500px] min-h-[500px]">
              <Skeleton className="h-10 w-[320px] space-y-20 rounded-lg bg-default-300" />
              <Spacer x={6} />
              <Skeleton className="h-5 w-[180px] space-y-20 rounded-lg bg-default-300" />
              <Spacer x={6} />
              <Skeleton className="h-8 w-[170px] space-y-20 rounded-lg bg-default-300" />
              <Spacer x={7} />
              <Card className="bg-[#18181b] border-gray-800 p-4 min-h-[360px]"></Card>
              </Card>
            </div>
            <div className="flex-1">
              <Card className="border-gray-800 p-4 max-h-[500px] min-h-[500px]">
              <Skeleton className="h-10 w-[320px] space-y-20 rounded-lg bg-default-300" />
              <Spacer x={6} />
              <Skeleton className="h-5 w-[180px] space-y-20 rounded-lg bg-default-300" />
              <Spacer x={7} />
              <Card className="bg-[#18181b] border-gray-800 p-4 min-h-[400px]"></Card>
              </Card>
            </div>
        </div>

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
      </div>
            
    );
  }