import {Card, Skeleton} from "@heroui/react";
import {Spacer} from "@heroui/spacer";

export default function UserPageActifSkeleton() {

    return (
      <div className="flex-1">
        <Card className="border-gray-800 p-4 max-h-[500px] min-h-[500px]">
          <Skeleton className="h-10 w-[320px] space-y-20 rounded-lg bg-default-300" />
          <Spacer y={2} />
          <Skeleton className="h-5 w-[180px] space-y-20 rounded-lg bg-default-300" />
          <Spacer y={2} />
          <Skeleton className="h-8 w-[170px] space-y-20 rounded-lg bg-default-300" />
          <Spacer y={2} />
          <Skeleton className="bg-[#18181b] border-gray-800 p-4 min-h-[360px] rounded-lg bg-default-300" />
        </Card>
      </div>
    );
  }