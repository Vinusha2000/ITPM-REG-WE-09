const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
       
    EID:{
        type: String,
        required:true
    },
    FullName:{
        type: String,
        required:true
    },
    EmployeeType:{
        type: String,
        required:true
    },
    BasicSalary:{
        type: String,
        required:true
    },
    OT:{
        type: String,
        required:false
    },
    Allowance:{
        type: String,
        required:true
    },
    NetPay:{
        type: String,
        required:true
    }
    // AccountNo:{
    //     type: String,
    //     required:false
    // }


});


module.exports = mongoose.model('Posts',postSchema)