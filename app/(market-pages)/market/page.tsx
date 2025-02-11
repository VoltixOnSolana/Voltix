'use server'

import React from "react";
import { TablesTokens } from "@/components/tables-tokens";
import { Suspense } from 'react'
import TableSkeleton from "./loading-market-table";

export default async function Market() {
  return(
      <Suspense fallback={<TableSkeleton />}>
        <TablesTokens isActifUser={false} />
      </Suspense>
  );
}

