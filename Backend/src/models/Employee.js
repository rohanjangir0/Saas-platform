const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, default: "Active" },
  joinDate: { type: Date, default: Date.now },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
