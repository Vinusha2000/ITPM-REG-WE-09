const mongoose = require("mongoose"); //import mongoose

const leaveSchema = new mongoose.Schema({
  //schema columns(variables and conditions)
  leave_id: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  fName: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
    //default: Date.now
  },
  leaveType: {
    type: String,
    required: true,
  },
});

//export (db name, schema pass)
module.exports = mongoose.model("Leaves", leaveSchema);
