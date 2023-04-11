import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config({path:"../config.env"});

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : Number,
        require : true
    },
    work : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    // tokens:[
    //     {
    //         token:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ]
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next;
});

// userSchema.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     }catch(err){
//         console.log(err)
//     }
// }


const User = new mongoose.model("USER", userSchema);
export default User


//must be used in app.js file
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));