import { useContext } from "react";
import { UserProgressContext } from "../store/userProgressContext.jsx";

import { CartContext } from "../store/shopping-cart-context.jsx";

import Button from "./UI/Button.jsx";
export default function Header() {
  const userProgressCtx = useContext(UserProgressContext);
  const { items } = useContext(CartContext);
  const handleShowCart = () => {
    userProgressCtx.showCart();
  };
  const cartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" alt="" />
        <h1>Food order app</h1>
      </div>
      <Button onClick={handleShowCart} textOnly>
        Cart ({cartQuantity})
      </Button>
    </header>
  );
}
