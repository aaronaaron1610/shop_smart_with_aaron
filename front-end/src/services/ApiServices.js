// src/services/ApiServices.js

const apiBaseUrl = "https://shop-smart-with-aaron.onrender.com";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/products`);
    console.log("response ", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (product_id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/products/${product_id}`);
    console.log("response ", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error(`Error fetching product with id ${product_id}:`, error);
    throw error;
  }
};
