const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;

    // Generate unique employeeId
    const employeeId = "EMP" + Date.now();

    // Generate random password
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newEmployee = new Employee({
      name,
      email,
      phone,
      department,
      employeeId,
      password: hashedPassword,
      status: "Active",
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee: {
        _id: newEmployee._id,
        name,
        email,
        phone,
        department,
        employeeId,
        status: "Active",
      },
      rawPassword, // send once to admin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password"); // hide password
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
exports.loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Find employee by employeeId
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        employeeId: employee.employeeId,
        department: employee.department,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// controllers/taskController.js

