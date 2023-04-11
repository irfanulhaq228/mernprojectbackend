import express from "express";
import { postData, getData, updateUser } from "../APIs/api.js"

const Router = express.Router()

Router.post("/postdata", postData)

Router.post("/getdata", getData)

Router.post("/:id", updateUser)

export default Router;