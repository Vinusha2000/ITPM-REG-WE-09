const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Item_ID : {
        type : String,
        required: true
    },
    Item_Name : {
        type : String,
        required: true
    },
    Brand_Name : {
        type : String,
        required: true
    },
    Category : {
        type : String,
        required: true
    },
    Quality_Assurance : {
        type : String,
        required: true
    },
    Unit_Price : {
        type : String,
        required: true
    },
    Unit_Profit : {
        type : String,
        required: true
    },

})

module.exports = mongoose.model('Item',postSchema);