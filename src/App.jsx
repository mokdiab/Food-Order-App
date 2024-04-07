import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import UserProgressContextProvider from "./store/userProgressContext.jsx";
function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
