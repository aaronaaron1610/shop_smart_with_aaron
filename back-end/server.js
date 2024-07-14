const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productController = require("./controllers/productController");

const app = express();
const port = 3200;

const mongoUri =
  "mongodb+srv://immanuelaaron1:djD416DF1w7tz4eX@affiliate.ynw3ukp.mongodb.net/production?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(cors());

app.get("/products", productController.getAllProducts);
app.get("/products/:product_id", productController.getProductById);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
