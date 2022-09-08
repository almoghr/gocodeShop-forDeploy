const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  getAllProducts,
  getProductById,
  getAllproductsByMatchingCategory,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("./controllers/product");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.static("client/build"));
app.use(cors());

//ROUTES
app.get("/api/products", getAllProducts);
app.get("/api/product/:productId", getProductById);
app.get("/api/products/:category", getAllproductsByMatchingCategory);
app.post("/api/products", addProduct);
app.delete("/api/product/:productId", deleteProduct);
app.put("/api/product/:productId", updateProduct);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    app.listen(PORT || 8000, () => {
      console.log("err", err);
      console.log("Ani maazin!");
    });
  }
);
