import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";

// Import local product data
import productsData from "./services/data";

function App() {
  const [products] = useState(productsData);

  // Function to clear cookies and cache
  useEffect(() => {
    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Attempt to clear cache
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }

    console.log("Cookies, cache, and storage cleared!");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/product/:productId"
          element={<ProductDetail products={products} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
