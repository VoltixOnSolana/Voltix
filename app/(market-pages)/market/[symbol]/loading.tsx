import React from 'react'
import { Skeleton, Card, CardHeader} from "@heroui/react";

export default function LoadingMarketPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique principal */}
        <div className="lg:col-span-2 h-[400px]">
          <Card className="w-full h-full">
            <Skeleton className="w-full h-full rounded-lg" />
          </Card>
        </div>

        {/* Section trading */}
        <div>
          <Card className="w-full h-[400px]">
            <Skeleton className="w-full h-full rounded-lg" />
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistiques du token */}
        <Card className="bg-[#18181b] border-gray-800">
          <CardHeader>
            <div className="flex justify-between px-4">
              <Skeleton className="h-6 w-1/3 rounded-lg" />
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex justify-between px-4">
              <Skeleton className="h-4 w-1/4 rounded-lg" />
              <Skeleton className="h-4 w-1/4 rounded-lg" />
            </div>
            <div className="flex justify-between px-4">
              <Skeleton className="h-4 w-1/4 rounded-lg" />
              <Skeleton className="h-4 w-1/4 rounded-lg" />
            </div>
          </div>
        </Card>

        {/* Transactions récentes */}
        <Card className="w-full h-64">
          <Skeleton className="w-full h-full rounded-lg" />
        </Card>
      </div>
    </div>
  )
}
