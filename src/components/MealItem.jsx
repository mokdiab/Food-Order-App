import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";
export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const handleAdditemToCart = function (item) {
    cartCtx.onAddToCart(item);
  };
  return (
    <li className="meal-item">
      <article>
        <img
          src={`https://food-app-backend-e5cj.onrender.com/${meal.image}`}
          alt={meal.title}
        />
        <div>
          <h3 className="">{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => handleAdditemToCart(meal)}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
