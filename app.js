import dotenv from "dotenv"
dotenv.config({path:"./config.env"});

import express from "express"
const app = express();

import Router from "./router/routes.js";
import cors from "cors"

const port = process.env.PORT;
import "./DB/conn.js";
//const User = require("./model/userSchema");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.use("/", Router)

app.listen(port, ()=>{
    console.log(`server runs at server ${port}`)
})