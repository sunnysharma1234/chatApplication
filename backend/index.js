const express = require ("express");
require('dotenv').config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const messageRoute = require("./routes/messageRoute")
const cors = require("cors")
// const bcrypt = require('bcrypt');

const connect = require("./config/database") 

const cookieParser = require('cookie-parser')

// connect(); 
   
const app = express();
 
const port = process.env.port;

app.use(express.urlencoded({extended:true})) 
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:"http://localhost:3000",
    credentials:true,
}
app.use(cors(corsOption))
 
    
// all routes 
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);


app.listen(port,()=>{
    // connect();
    console.log("serve is listening");
})   