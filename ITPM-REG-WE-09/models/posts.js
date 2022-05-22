const { type } = require('express/lib/response');
const { truncate } = require('fs');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    Cat_ID:{
        type:String,
        required:true
    },
    Category_Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('Category',postSchema);