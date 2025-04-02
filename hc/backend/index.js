const express = require("express");
const cors = require("cors");
require("dotenv").config();  // Load environment variables

// Import route files
const announcementsRouter = require("./routes/Announcement");
const lateEntryRouter = require("./routes/LateEntry");
const userRouter = require("./routes/User");
const complaintsRouter = require("./routes/Complaints");
const lostandfoundRouter = require("./routes/LostandFound");
const { router: authRoutes, excludeGoogleOAuthRoutes } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true // ✅ Allow cookies
}));
app.use(cookieParser());
// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/announcements", announcementsRouter);
app.use("/api/late-entry", lateEntryRouter);
app.use("/api/user", userRouter);
app.use("/api/complaints", complaintsRouter);
app.use("/api/lost-found", lostandfoundRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/set-cookie", (req, res) => {
  res.cookie("testCookie", "helloWorld", { httpOnly: true, sameSite: "Strict" });
  res.send("Cookie Set!");
});

app.get("/get-cookie", (req, res) => {
  console.log("Cookies:", req.cookies);
  res.json(req.cookies);
});
// Apply middleware
app.use(excludeGoogleOAuthRoutes);
app.use("/auth", authRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
