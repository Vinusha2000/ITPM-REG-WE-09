const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require("./models/db");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const url = process.env.ATLAS_URL;
// mongoose.connect(url);
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("Database connection established successfully");
// })

const salesRouter = require('./routes/sales');
const itemRouter = require('./routes/items');

app.use('/sales', salesRouter);
app.use('/list', itemRouter);

db.connect((err)=>{
    if(err){
        console.log('unable to connect to database' , err);
        process.exit(1);
    }
    else{
        app.listen(PORT, () => console.log(`connected to database, Listening on ${ PORT }`));
    }
});


