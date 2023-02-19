import React, { useState, useEffect } from "react";
// This does a lot of the heavy lifting for the backend work - commercejs is great :)
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";
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
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route exact path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
