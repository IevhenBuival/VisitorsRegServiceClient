import IVisit from "@/types/visit";
import { IOrder } from "@/types/OrderBy";
export const findFirstFormSorted = (visits: IVisit[], order: IOrder) => {
  if (visits.length > 0) {
    return [...visits].sort((a: IVisit, b: IVisit): number =>
      a[order.order] > b[order.order]
        ? order.reverse
          ? -1
          : 1
        : order.reverse
        ? 1
        : -1
    )[0].visitId;
  }
  return "";
};
