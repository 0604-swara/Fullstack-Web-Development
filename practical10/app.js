// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Path to log file (change if needed)
const logFilePath = process.env.LOG_FILE_PATH || path.join(__dirname, 'error.log');

// Basic home page
app.get('/', (_req, res) => {
  res.send(`<html><body style="font-family: system-ui; padding:16px">
    <h2>Log Viewer</h2>
    <p>View logs at <a href="/logs">/logs</a></p>
    <p><small>Using: <code>${logFilePath}</code></small></p>
  </body></html>`);
});

// Route to display logs
app.get('/logs', (_req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err.message);
      const status = err.code === 'ENOENT' ? 404 : 500;
      return res.status(status).send(`
        <html>
          <head>
            <title>Error loading logs</title>
            <style>
              body { font-family: system-ui; background:#111; color:#eee; padding:24px; }
              .box { background:#222; padding:16px; border-radius:10px; }
              h2 { color:#ff6b6b; }
              a { color: #9ad; }
            </style>
          </head>
          <body>
            <div class="box">
              <h2>⚠️ Unable to load logs</h2>
              <p><strong>Reason:</strong> ${err.message}</p>
              <p>Ensure the file exists and the app has read permission.</p>
              <p><a href="/">← Back</a></p>
            </div>
          </body>
        </html>
      `);
    }

    // Escape HTML and preserve newlines
    const formatted = data.replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;');

    res.send(`
      <html>
        <head>
          <title>Error Logs</title>
          <style>
            body { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background:#0b0b0b; color:#eaeaea; padding:24px; }
            pre  { white-space: pre-wrap; background:#131313; padding:16px; border-radius:12px; border:1px solid #222; }
            h2   { margin-top:0; }
            a { color: #9ad; }
          </style>
        </head>
        <body>
          <h2>Error Logs</h2>
          <p><small>File: <code>${logFilePath}</code></small></p>
          <pre>${formatted}</pre>
          <p><a href="/">← Home</a></p>
        </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Log viewer running at http://localhost:${PORT}`);
  console.log(`Reading: ${logFilePath}`);
});
