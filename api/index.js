const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { db } = require("../config/firebase");

const app = express();

// ✅ CORS (sirf tumhari site allow)
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5502",
    "http://localhost:3000",
    "https://your-frontend.netlify.app" // yahan apni real site daalna
  ]
}));

app.use(express.json());

// 🔐 simple API key security
const SECRET_KEY = "my_secret_123";

// ✅ test route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ✅ GET DATA FROM FIREBASE
app.get("/api/contact", async (req, res) => {
  try {
    const clientKey = req.headers["x-api-key"];

    // 🔒 unauthorized block
    if (clientKey !== SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const snapshot = await db.collection("contact").get();

    let data = [];
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = app;