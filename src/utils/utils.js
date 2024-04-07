import { currencyFormatter } from "./formatting";
export const totalPrice = (items) =>
  currencyFormatter(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  );
