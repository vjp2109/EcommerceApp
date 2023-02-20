import React, { useState, useEffect } from "react";
// This does a lot of the heavy lifting for the backend work - commercejs is great :)
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Come back to this - might have to update ALL OF IT - but first let's make it run
const App = () => {
  const [products, setProducts] = useState([]);
  // Might have to switch this
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    // we have to wait to see what inside the promise
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);
  // console.log(cart.total_items);
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
