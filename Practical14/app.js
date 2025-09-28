const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Create uploads folder if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

// Only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed!"));
};

// Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: fileFilter,
});

// Serve static CSS
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Render upload form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Upload Resume</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="container">
        <h1>Upload Your Resume</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="resume" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Upload route
app.post("/upload", (req, res) => {
  upload.single("resume")(req, res, (err) => {
    let message;
    if (err instanceof multer.MulterError) {
      message =
        err.code === "LIMIT_FILE_SIZE"
          ? "File is too large. Max size is 2MB."
          : err.message;
    } else if (err) {
      message = err.message;
    } else if (!req.file) {
      message = "Please upload a file.";
    } else {
      message = "File uploaded successfully!";
    }

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Upload Result</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h1>${message}</h1>
          <a href="/">Upload another file</a>
        </div>
      </body>
      </html>
    `);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
