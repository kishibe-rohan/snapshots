import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

import User from '../models/userModel.js'

const secret = process.env.SECRET || 'test'

export const signIn = async (req,res) => {
    const {email,password} = req.body;
    try{
         const exisitingUser = await User.findOne({email});
         if(!exisitingUser)
         return res.status(404).json({message:"User does not exist"})

         const isPasswordCorrect = await bcrypt.compare(password,exisitingUser.password)
         if(!isPasswordCorrect)
         return res.status(400).json({message:"Password does not match"})

         const token = jwt.sign({email:exisitingUser.email,id:exisitingUser._id},secret,{expiresIn:"1h"})
         res.status(200).json({result:exisitingUser,token});
    }
    catch(error)
    {
            res.status(500).json({message:"Something went wrong.."})
    }
}

export const signUp = async (req,res) => {
    const {firstName,lastName,email,password,confirmPassword} = req.body;

    try{
        const exisitingUser = await User.findOne({email});
        if(exisitingUser)
        return res.status(400).json({message:"User already exists"})

        if(password !== confirmPassword)
        return res.status(400).json({message:"Passwords do not match"})

        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email:result.email,id:result._id},secret,{ expiresIn: "1h" })

        res.status(201).json({result,token});
    }
    catch(error)
    {
        res.status(500).json({ message: "Something went wrong" });
    
        console.log(error);
    }
}