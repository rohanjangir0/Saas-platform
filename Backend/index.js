const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());        // allow all origins
app.use(express.json()); // parse JSON request bodies

// Routes
const authRouter = require("./src/routes/auth");
const leavesRouter = require("./src/routes/leaves");
const employeeRoutes = require("./src/routes/employeeRoutes");

// Register routes
app.use("/api/employees", employeeRoutes); // employee login/add
app.use("/api/auth", authRouter);
app.use("/api/leaves", leavesRouter);

// Catch-all 404 for unregistered routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
