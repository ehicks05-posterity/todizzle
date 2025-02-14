import { db } from "@/lib/db";

export const useActiveProduct = () => {
  const { data } = db.useQuery({ $users: { product: {} } });
  const activeProduct = data?.$users[0]?.product;
  return activeProduct;
};