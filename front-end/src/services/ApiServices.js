// src/services/ApiServices.js

const apiBaseUrl = "https://8014-3-110-194-232.ngrok-free.app";

const headers = new Headers({
  "ngrok-skip-browser-warning": "69420",
});

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/products`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched products:", data);
    return data.products; // Adjusted to return the entire data if `data.products` is not defined
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (product_id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/products/${product_id}`, {
      method: "GET",
      headers: headers,
    });
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
