const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: String,
  brand: String,
  name: String,
  images: [String],
  currentPrice: String,
  discountPercentage: Number,
  mrp: String,
  rating: Number,
  ratingCount: Number,
  boughtLastMonth: Number,
  returnPolicy: String,
  warranty: String,
  urls: {
    amazon: String,
    flipkart: String,
    youtube: String,
  },
  prices: {
    amazon: String,
    flipkart: String,
  },
  problemItSolves: [String],
  advantages: [String],
  disadvantages: [String],
  specialFeatures: [String],
  includedComponents: [String],
  recommendedUses: [String],
  itemWeight: String,
  countryOfOrigin: String,
  manufacturer: String,
  productDimensions: String,
  ingredients: [String],
  usageTips: [String],
  whyBetter: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
