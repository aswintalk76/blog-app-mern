const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const port = process.env.port || 5000;

//env config
dotenv.config();

//mongodb connection
connectDB();

//rest objecct
const app = express();

//create a default route
app.get("/", (req, res) => {
    res.send(`Server is working on ${port}`);
});

//listen
app.listen(port,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode port no ${port}`.bgCyan
    .white);
})