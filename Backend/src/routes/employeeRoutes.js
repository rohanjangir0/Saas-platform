const express = require("express");
const router = express.Router();
const { addEmployee, getEmployees, loginEmployee } = require("../controllers/employeeController");

router.post("/add", addEmployee);
router.get("/", getEmployees);
router.post("/login", loginEmployee); // <-- new route


module.exports = router;
