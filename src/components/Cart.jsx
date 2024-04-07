import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { UserProgressContext } from "../store/userProgressContext";
import { totalPrice } from "../utils/utils";
import Button from "./UI/Button";
import Modal from "./Modal";
import CartItem from "./CartItem";
export default function Cart() {
  const { items, onUpdateitemQuantity } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const handleHideCart = () => {
    userProgressCtx.hideCart();
  };
  const handleCheckout = () => {
    userProgressCtx.showCheckout();
  };
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleHideCart : null}
    >
      {items.length === 0 && (
        <>
          <p>No items in cart!</p>
          <Button onClick={handleHideCart} textOnly>
            Close
          </Button>
        </>
      )}
      {items.length > 0 && (
        <div>
          <h2>Your Cart</h2>
          <ul>
            {items.map((item) => (
              <CartItem
                onUpdateitemQuantity={onUpdateitemQuantity}
                item={item}
                key={item.id}
              />
            ))}
          </ul>
          <p className="cart-total">{totalPrice(items)}</p>
          <Button onClick={handleHideCart} textOnly>
            Close
          </Button>
          <Button onClick={handleCheckout}>Go to checkout</Button>
        </div>
      )}
    </Modal>
  );
}
