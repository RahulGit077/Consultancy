const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/billing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Purchase Schema
const purchaseSchema = new mongoose.Schema({
  customer: {
    name: String,
    place: String,
    phone: String,
    address: String,
  },
  products: Array,
  total: Number,
  date: { type: Date, default: Date.now },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

// ➕ Add product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// 📄 Get all products
app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get('/api/purchases', async (req, res) => {
    try {
      // Assuming you're using MongoDB
      const purchases = await Purchase.find(); // Replace with actual model
      res.status(200).json(purchases);
    } catch (err) {
      console.error("Error fetching purchases:", err);
      res.status(500).json({ message: "Error fetching purchase history" });
    }
  });
  

// 🔄 Update product quantity after billing
app.put("/api/products/:id", async (req, res) => {
  const { quantityToReduce } = req.body;

  try {
    const product = await Product.findOne({ product_id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.quantity < quantityToReduce) {
      return res.status(400).json({ error: "Insufficient quantity" });
    }

    product.quantity -= quantityToReduce;
    await product.save();

    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (err) {
    console.error("❌ Error updating quantity:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

// ❌ Optional: Delete a product completely
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ product_id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product removed successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// 💾 Save purchase (billing)
app.post("/api/purchases", async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.status(201).json({ message: "Purchase saved successfully" });
  } catch (err) {
    console.error("❌ Error saving purchase:", err);
    res.status(500).json({ error: "Failed to save purchase" });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
