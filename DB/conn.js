import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({path:"./config.env"});
const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);
mongoose.connect(DB)
  .then(() => console.log('Connection Successfull!'))
  .catch((err)=>console.log(err));