import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
// import CategoryPage from './components/CategoryPage';
import { getAllProducts } from "./services/ApiServices";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/product/:productId"
          element={<ProductDetail products={products} />}
        />
        {/* <Route path="/category/:categoryName" element={<CategoryPage products={products} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
