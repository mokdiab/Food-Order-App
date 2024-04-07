import { currencyFormatter } from "../utils/formatting";
export default function CartItem({ item, onUpdateitemQuantity }) {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {currencyFormatter(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => onUpdateitemQuantity(item.id, -1)} type="button">
          -
        </button>
        <span className="">{item.quantity}</span>
        <button onClick={() => onUpdateitemQuantity(item.id, 1)} type="button">
          +
        </button>
      </p>
    </li>
  );
}
