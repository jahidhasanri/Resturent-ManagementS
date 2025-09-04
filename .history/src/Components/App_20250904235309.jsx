import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { CartProvider } from "./CartContext";


const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <CartProvider user={user}>
      <Navbar />
      {/* other routes */}
    </CartProvider>
  );
};
