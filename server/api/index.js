const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
  irradiance: Number,
  temperature: Number,
  voltage: Number,
  azimuth: Number,
  zenith: Number,
  timestamp: { type: Date, default: Date.now },
});

const Data = mongoose.model("Data", dataSchema);

// Route to handle POST requests from ESP32
app.post("/api/data", async (req, res) => {
  const { irradiance, temperature, voltage, azimuth, zenith } = req.body;
  const newData = new Data({ irradiance, temperature, voltage, azimuth, zenith });

  try {
    await newData.save();
    res.status(201).send("Data saved successfully");
  } catch (error) {
    res.status(500).send("Error saving data");
  }
});

// Route to handle GET requests for fetching data
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find().sort({ timestamp: -1 }).limit(10);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
