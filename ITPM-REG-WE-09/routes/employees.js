//http request for crud

const express = require("express");
const Employees = require("../models/employees");

const router = express.Router();

//save posts (path/url (call back func) => )   -->> CREATE
router.post("/employee/save", (req, res) => {
  let newEmployee = new Employees(req.body);

  //save
  newEmployee.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } //if no error to save this  //key and value
    return res.status(200).json({
      success: "Employee saved successfully",
    });
  });
});

//get posts     -----> READ

router.get("/employees", (req, res) => {
  Employees.find().exec((err, employees) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      existingEmployees: employees,
    });
  });
});

//get a specific post
router.get("/employee/:id", (req, res) => {
  let employeeId = req.params.id;

  Employees.findById(employeeId, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  });
});

//update posts      ----> UPDATE

router.put("/employee/update/:id", (req, res) => {
  Employees.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, employee) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated Successful",
        //key :value
      });
    }
  );
});

//delete posts      -----> DELETE

router.delete("/employee/delete/:id", (req, res) => {
  Employees.findByIdAndRemove(req.params.id).exec((err, deletedEmployee) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });

    return res.json({
      message: "Delete Successful",
      deletedEmployee,
    });
  });
});

//export above details
module.exports = router;
