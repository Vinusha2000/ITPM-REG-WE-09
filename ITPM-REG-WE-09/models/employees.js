const mongoose = require("mongoose"); //import mongoose

const employeeSchema = new mongoose.Schema({
  //schema columns(variables and conditions)
  emp_id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//export (db name, schema pass)
module.exports = mongoose.model("Employees", employeeSchema);
