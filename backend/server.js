require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const projectRoutes = require("./routes/projects");
const achievementRoutes = require("./routes/achievements");
const eventRoutes = require("./routes/events");
const teamRoutes = require("./routes/team");
const galleryRoutes = require("./routes/gallery");
const videoRoutes = require("./routes/videos");
const registrationRoutes = require("./routes/registrations");

const app = express();

connectDB();

/*
  Frontend development servers may use 5173, 5174 or 5175
  when another Vite process is already using a port.
*/
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests such as Postman/server-side requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS: Origin not allowed")
      );
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/registrations", registrationRoutes);

// API health check
app.get("/", (req, res) => {
  res.json({
    message: "Pixel Pirates Academy API is running",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Pixel Pirates API running on http://0.0.0.0:${PORT}`
  );
});