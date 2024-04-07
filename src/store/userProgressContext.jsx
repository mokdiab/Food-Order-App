import { createContext } from "react";
import { useState } from "react";
export const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});
export default function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");
  const showCart = () => {
    setProgress("cart");
  };
  const hideCart = () => {
    setProgress("");
  };
  const showCheckout = () => {
    setProgress("checkout");
  };
  const hideCheckout = () => {
    setProgress("");
  };
  const userCtx = {
    progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={userCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
