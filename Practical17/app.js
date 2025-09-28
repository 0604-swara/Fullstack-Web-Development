const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend files

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://swara0604:swaramegha@cluster0.jncv37n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  age: Number
});

const Student = mongoose.model("Student", studentSchema);

// ---------------- ROUTES ---------------- //

// Add Student
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "✅ Student added successfully", student });
  } catch (err) {
    res.status(500).json({ message: "❌ Error adding student", error: err });
  }
});

// View All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching students" });
  }
});

// Edit Student
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "✏️ Student updated", student });
  } catch (err) {
    res.status(500).json({ message: "❌ Error updating student" });
  }
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑️ Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting student" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
