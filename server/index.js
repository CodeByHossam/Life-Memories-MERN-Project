// Importing express, middlewares, and database connection
import express from "express";
import connectToDB from "./middlewares/connectToDB.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";
import cors from "cors";

// Importing Routers
import postRouter from "./routers/postRouters.js";

// Initialize App
const app = express();
const port = process.env.PORT || 5000; // ✅ Correct fallback

// Connect to Database with Error Handling
connectToDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

// Using Middlewares
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serving Static Files
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve public folder and uploads
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Serve uploaded files

// Main API Route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// Post Router
app.use("/api/posts", postRouter);

// Fallback Route for SPA (Optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // ✅ Catch-all route for React apps
});

// Not Found Middleware
app.use(notFound);

// Starting the Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
