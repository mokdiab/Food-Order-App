import { createContext, useReducer, useEffect } from "react";
export const CartContext = createContext({
  items: [],
  onAddToCart: () => {},
  onUpdateitemQuantity: () => {},
});

const shoppingCartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingitem = updatedItems[existingItemIndex];
    if (existingitem) {
      const updatedItem = {
        ...existingitem,
        quantity: existingitem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      const item = action.payload;
      updatedItems.push({
        ...item,
        quantity: 1,
      });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const itemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.id
    );
    const updatedItem = {
      ...updatedItems[itemIndex],
    };
    updatedItem.quantity += action.payload.quantity;
    if (updatedItem.quantity <= 0) {
      updatedItems.splice(itemIndex, 1);
    } else {
      updatedItems[itemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
};
export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatcher] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );
  function handleAdditemToCart(item) {
    shoppingCartDispatcher({
      type: "ADD_ITEM",
      payload: item,
    });
  }
  function handleClearCart() {
    shoppingCartDispatcher({
      type: "CLEAR_CART",
    });
  }
  function handleUpdateCartitemQuantity(id, quantity) {
    shoppingCartDispatcher({
      type: "UPDATE_ITEM",
      payload: {
        id,
        quantity,
      },
    });
  }
  const cartCTX = {
    items: shoppingCartState.items,
    onAddToCart: handleAdditemToCart,
    onUpdateitemQuantity: handleUpdateCartitemQuantity,
    onClearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={cartCTX}>{children}</CartContext.Provider>
  );
}
