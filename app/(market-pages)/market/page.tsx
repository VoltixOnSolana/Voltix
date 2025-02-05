import React from "react";
import { getTokenFromDb } from "../action/marketAction";
import { TablesTokens } from "@/components/tables-tokens";

export const revalidate = 60;

export default async function Market() {
  const tokensFromDb = await getTokenFromDb();
  return <TablesTokens isActifUser={false} tokensFromDb={tokensFromDb} />;
}

