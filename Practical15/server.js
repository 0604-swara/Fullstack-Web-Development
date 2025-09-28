const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

app.use(session({
    secret: "library-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } // 10 min
}));

// Utility: Load users
function loadUsers() {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Utility: Save users
function saveUsers(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// Utility: Format date & time
function formatDateTime(date) {
  return date.toLocaleString("en-IN", { 
    timeZone: "Asia/Kolkata", 
    dateStyle: "full", 
    timeStyle: "medium" 
  });
}

// Routes

// Login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Register page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Handle registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("⚠️ Username and password required! <a href='/register'>Try again</a>");
    }

    let users = loadUsers();
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.send("⚠️ Username already exists! <a href='/register'>Try again</a>");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, lastLogin: null, sessionDuration: null });
    saveUsers(users);

    res.send("✅ Registration successful! <a href='/'>Login now</a>");
});

// Handle login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let users = loadUsers();

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.send("❌ Invalid username! <a href='/'>Try again</a>");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send("❌ Incorrect password! <a href='/'>Try again</a>");
    }

    const loginTime = new Date();
    const formattedLoginTime = formatDateTime(loginTime);

    // Store session info
    req.session.username = user.username;
    req.session.loginTime = loginTime;

    // Update user data
    user.lastLogin = formattedLoginTime;
    user.sessionDuration = null;
    saveUsers(users);

    res.redirect("/profile");
});

// Profile page
// Profile page
app.get("/profile", (req, res) => {
    if (!req.session.username) {
        return res.redirect("/");
    }

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Profile</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div class="container large-container">
          <h2>Your Profile</h2>
          <div class="profile-info">
            <p><strong>Name:</strong> ${req.session.username}</p>
            <p><strong>Login Time:</strong> ${formatDateTime(new Date(req.session.loginTime))}</p>
          </div>
          <form action="/logout" method="GET">
            <button type="submit">Logout</button>
          </form>
        </div>
      </body>
      </html>
    `);
});



// Logout
app.get("/logout", (req, res) => {
    if (!req.session.username) {
        return res.redirect("/");
    }

    let users = loadUsers();
    const user = users.find(u => u.username === req.session.username);

    if (user && req.session.loginTime) {
        const logoutTime = new Date();
        const durationMs = logoutTime - new Date(req.session.loginTime);
        const durationMin = Math.round(durationMs / 60000); // minutes
        user.sessionDuration = `${durationMin} minute(s)`;

        saveUsers(users);
    }

    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.redirect("/");
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
