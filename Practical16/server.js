const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve form at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.post("/send-message", (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 Form Data Received:", req.body); // Debug log

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  res.json({ message: `✅ Got message from ${name} (${email})` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
