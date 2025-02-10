import React from 'react'
import { Skeleton, Card, CardHeader} from "@heroui/react";
import {Spacer} from "@heroui/spacer";

export default function LoadingMarketPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique principal */}
        <div className="lg:col-span-2 h-[400px]">
          <Card className="w-full h-full p-4">
            <Skeleton className="h-9 w-[250px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={2} />
            <Skeleton className="h-10 w-[380px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={2} />
            <Skeleton className="h-5 w-[180px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={2} />
            <Skeleton className="border-gray-800 p-4 min-h-[245px] rounded-lg bg-default-300" />
          </Card>
        </div>

        {/* Section trading */}
        <div>
          <Card className="w-full h-[400px] p-4">
            <Skeleton className="h-11 w-[180px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={4} />
            <Skeleton className="h-10 w-[170px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={3} />
            <Skeleton className="h-5 w-[200px] space-y-20 rounded-lg bg-default-300" />
            <Spacer y={4} />
            <Skeleton className="h-10 w-full space-y-20 rounded-lg bg-default-300" />
            <Spacer y={3} />
            <Skeleton className="h-10 w-full space-y-20 rounded-lg bg-default-300" />
            <Spacer y={5} />
            <Skeleton className="h-10 w-full space-y-20 rounded-lg bg-default-300" />
            <Spacer y={4} />
            <Skeleton className="h-10 w-full space-y-20 rounded-lg bg-default-300" />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistiques du token */}
        <Card className="bg-[#18181b] border-gray-800 p-4">
          <Skeleton className="h-10 w-[250px] space-y-20 rounded-lg bg-default-300" />
          <Spacer y={4} />
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-1/4 rounded-lg" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-1/4 rounded-lg" />
            </div>
          </div>
        </Card>

        {/* Transactions récentes */}
        
        <Card className="w-full p-4 space-y-3 p-4">
          <Skeleton className="h-10 w-[250px] space-y-20 rounded-lg bg-default-300" />
          <Spacer y={7} />
          <Card className="w-full p-4 space-y-3 p-4">
            <Skeleton className="h-10 w-full rounded-lg bg-default-300" />
            <div className="space-y-5">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-2">
                <Skeleton className="h-6 w-1/4 rounded-lg bg-default-200" />
                <Skeleton className="h-6 w-2/4 rounded-lg bg-default-200" />
                <Skeleton className="h-6 w-1/4 rounded-lg bg-default-300" />
                <Skeleton className="h-6 w-2/4 rounded-lg bg-default-300" />
                </div>
            ))}
            </div>
          </Card>
        </Card>
      </div>
    </div>
  )
}
