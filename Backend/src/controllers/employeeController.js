const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");

// Add Employee (already exists)
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;

    const employeeId = "EMP" + Date.now();
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
      rawPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
// Employee login
exports.loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const employee = await Employee.findOne({ employeeId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

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
    res.status(500).json({ message: "Server Error", error });
  }
};


// Get Employees (already exists)
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password"); // hide password
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, status } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, phone, department, status },
      { new: true }
    ).select("-password");

    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
