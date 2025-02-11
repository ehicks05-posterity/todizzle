import { db } from "@/lib/db";
import { FREE_TIER_ID } from "./constants";

export const useActiveProductId = () => {
  const { data } = db.useQuery({ customers: {} });
  const customer = data?.customers[0];
  const activeProductId = customer?.activeProductId || FREE_TIER_ID;
  return activeProductId;
};