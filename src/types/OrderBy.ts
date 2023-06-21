type OrderBy = "name" | "surname" | "visitAt";

export interface IOrder {
  order: OrderBy;
  reverse: boolean;
}

export default OrderBy;
