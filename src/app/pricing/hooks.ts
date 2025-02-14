import { db } from "@/lib/db";
import { FREE_TIER_ID } from "./constants";

export const useActiveProduct = () => {
  const { data } = db.useQuery({ $users: { product: {} } });
  const activeProduct = data?.$users[0]?.product;
  if (!activeProduct) return undefined;
  return { ...activeProduct, isPayingUser: activeProduct?.productId !== FREE_TIER_ID };
};