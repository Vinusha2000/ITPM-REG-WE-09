const express = require("express");
const mongoose = require("mongoose");

//json formt eka convert krnwa js wlata
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//import routes from routes
const employeeRoutes = require("./routes/employees");
const leaveRoutes = require("./routes/leaves");

//app middleware
app.use(bodyParser.json());
app.use(cors());

app.use(employeeRoutes);
app.use(leaveRoutes);

const PORT = 8080;

const DB_URL =
  // "mongodb+srv://mernApp2:mernApp2pwd@mernapp2.yyjyl.mongodb.net/mernAppDatabase?retryWrites=true&w=majority";
  "mongodb+srv://it20273644:ashini10@sunshine.mqusn.mongodb.net/Sunshine?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL) //if pmz is successful
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("DB connection error", err));
//if pmz is unsuccssful

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
