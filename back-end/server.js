const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const ngrok = require("@ngrok/ngrok");
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

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Set NGROK_AUTHTOKEN environment variable
process.env.NGROK_AUTHTOKEN =
  "2j61ky4dhuyiBBj5iKCRePlNiM6_3epEiuK6s7Cq6aV4tTnQD";

// Create webserver
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Get your endpoint online
  ngrok
    .connect({ addr: port, authtoken: process.env.NGROK_AUTHTOKEN })
    .then((listener) =>
      console.log(`Ingress established at: ${listener.url()}`)
    )
    .catch((err) => console.log("Ngrok connection error:", err));
});
