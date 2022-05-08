const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts');

//app middlware
app.use(bodyParser.json());
app.use(cors());

//routes middlware
app.use(postRoutes);

const PORT = 8000;
// const DB_URL ='mongodb+srv://twg:twg123@mernappp.dpzsy.mongodb.net/mernCrud?retryWrites=true&w=majority';
const DB_URL='mongodb+srv://it20139308:12345@sunshine.mqusn.mongodb.net/Sunshine?retryWrites=true&w=majority'

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT,() =>{
    console.log(`App is running on ${PORT}`);
});