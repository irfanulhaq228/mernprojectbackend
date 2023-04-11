const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")

require("../DB/conn");
const User = require("../model/userSchema");


router.get("/",(req, res)=>{
    res.send("Hello World from server router.js!")
})
router.get("/contact", (req, res)=>{
    res.send("Hello Contact from server router!")
})
router.get("/signin",(req, res)=>{
    res.send("Hello Login from server router!")
})
router.get("/signup",(req, res)=>{
    res.send("Hello Register from server router!")
})


//====================REGISTER
router.post("/register", async (req, res)=>{

    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password  || !cpassword){
        return res.status(422).json({error:"Complete all fileds!"})
    }
    try{
        const userExist = await User.findOne({email:email});
    
        if(userExist){
            return res.status(420).json({error:"email already exist!"})
        }else if(cpassword != password){
            return res.status(422).json({error:"Both Password not matched !"})
        }else{
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(201).json({message: "User Register Successfully"});
        }    
    }catch(err){
        console.log(err)
    }
    
    // res.json({message: req.body});
})



//====================LOGIN======================
router.post("/signin", async (req, res)=>{

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Complete all fileds!"})
    }
    try{
        const userLogin = await User.findOne({email:email});
        const isMatch = await bcrypt.compare(password, userLogin.password);

        //let token = await userLogin.generateAuthToken();
        // console.log(token);

        // res.cookie("jwtoken", token, {
        //     expires:new Date(Date.now()+ 25892000000),
        //     httpOnly:true
        // });

        if(!isMatch){
            res.status(401).json({error:"Password invalid!"});
            console.log("Password invalid!");
        }else{
            res.status(200).json({message:userLogin})
            // console.log(userLogin);
        }
    }catch(err){
        res.status(401).json({error:"Email not matched !"})
        console.log("Email not matched!")
    }
    
    // res.json({message: req.body});
})

//======================about page=======================


//authenticate as middleware (check user login or not)
router.get("/about", authenticate, (req, res)=>{
    res.send(req.rootUser);
})
router.get("/getdata", (req, res)=>{
   const a =  req.rootUser;
    res.status(200).json(a);
})


module.exports = router;
 