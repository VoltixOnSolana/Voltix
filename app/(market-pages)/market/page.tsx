import React from "react";
import { TablesTokens } from "@/components/tables-tokens";
import { Suspense } from 'react'
// import TableSkeleton from "../loading"; '../loading'
import TableSkeleton from "./loading";

export default async function Market() {
  return(
      <Suspense fallback={<TableSkeleton />}>
        <TablesTokens isActifUser={false} />
      </Suspense>
  );
}

