import User from "../model/userSchema.js"
import bcrypt from "bcryptjs"

const postData = async(req, res)=>{
    const userData = req.body
    const userEmail = userData.email;
    const newUser = await User(userData)
    try{
        const checkUser = await User.findOne({email:userEmail})
        if(checkUser){
            res.status(409).json("Email already Exist!")
        }else{
            await newUser.save();
            res.status(201).json(newUser)
        }
    }catch(error){
        res.status(409).json({message: error.message});
    }
}

const getData = async(req, res) => {
    const {email, password} = req.body;
    try{
        const allData = await User.find({email: email});

        if(allData[0]===undefined){
            res.status(401).json("Email not exist")
        }else{
            const isMatch = await bcrypt.compare(password, allData[0].password)
            if(!isMatch){
                res.status(401).json("Password not exist")
            }else{
                res.json(allData[0])
            }
        }
    }catch(error){
        res.status(402).json(error)
    }
}

export const updateUser = async(request, responce) => {
    let user = request.body;
    
    try{
        await User.updateOne({_id:request.params.id},{$set: user})
        responce.status(201).json(user);
    }catch(error){
        responce.status(409).json({message: error.message})
        console.log("Kuch to locha hai")
    }
}

export { postData, getData }