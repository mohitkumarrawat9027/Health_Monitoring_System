require("dotenv").config();
const User=require("../models/User");
const JWT_SECRET=process.env.JWT_SECRET;
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const generateToken=(id)=>{
    return jwt.sign({id:id},JWT_SECRET,{expiresIn:"1h"});
}

const loginUser=async(req,res)=>{
    try{
       const{email,password}=req.body;
       if(!email || !password)
       return res.status(400).json({message:"email or password not present"});
       const user=await User.findOne({email});
       if(user){
            const isMatch=await bcrypt.compare(password,user.password);
            if(isMatch)
            {const token=generateToken(user._id);
            return res.status(200).json({message:"user verified successfully",token,id:user._id});
            }
            else
            return res.status(401).json({message:"Incorrect Password"});
       }
       else
       return res.status(404).json({message:"No User Found"});
    }
    catch(err){
        return res.status(500).json({message:err.message,err});
       }
}

const registerUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password)
        return res.status(400).json({message:"email or password not present"});
        const user=await User.findOne({email});
        if(user)
        return res.status(401).json({message:"User already Exists"});
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({email:email,password:hashedPassword});
        await newUser.save();
        if(newUser)
         {   const token=generateToken(newUser._id);
            return res.status(200).json({message:"New User Added",token,id:newUser._id});
        }
             else
             return res.status(401).json({message:"Some Error Occured"});
     }
     catch(err){
         return res.status(500).json({message:err.message,err});
        }
}

module.exports={loginUser,registerUser};