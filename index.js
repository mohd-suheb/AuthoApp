const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

//connect 
require('./config/database').connect();
 
//routes and mount
const user = require('./routes/user');
app.use('./api/v1', user);

//active
app.listen(PORT, ()=>{
    console.log("app started at Port no 3000");
});