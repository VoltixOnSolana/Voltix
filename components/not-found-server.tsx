import data from "@/data/data.json";
import { url } from "@/lib/utils";
import NotFoundClient from "./not-found-client";

async function getTokenData(symbol: string) {
  const res = await fetch(`${url}/api/tokens/${symbol}`);
  const data = await res.json();
  return data.success ? data.token : null;
}

export default async function NotFoundServer() {
  const tokens = await Promise.all(data.map(({ symbol }) => getTokenData(symbol)));

  return <NotFoundClient tokens={tokens.filter(Boolean)} />;
}
