const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());  // allows everything


app.use(express.json());


const authRouter = require("./src/routes/auth");
const leavesRouter = require("./src/routes/leaves"); 


app.use("/api/auth", authRouter);          
app.use("/api/leaves", leavesRouter);      

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
