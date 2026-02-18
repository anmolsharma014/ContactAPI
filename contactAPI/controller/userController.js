import express from "express";
import mongoose from "mongoose";
import { User } from "./../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup= async(req,res)=>{
    const{name,email,password}=req.body;
    let checkuser=await User.findOne({email});
    if(!checkuser)
    {
        let hashPassword=await bcrypt.hash(password,10);
        let user=await User.create({
            name,
            email,
            password :  hashPassword
        });
        res.json({
            message: "User Registration successfully",
            status:true
        });
    }
    else
    {
        res.json({
            message:"User already exist",
            status: false,
        });
    }
};

export const login= async(req,res)=>{
    const { email , password } = req.body;
    let checkuser = await User.findOne({email});

    if(!checkuser)
    {
        res.json({
            message:"User Not Found",
            status:false
        });
    }
    else
    {
        let validUser = await bcrypt.compare(password , checkuser.password);
        if(validUser)
        {
            let token = await jwt.sign({userId:checkuser._id},process.env.TOKEN);
            res.json({
                message:"Login Successfully",
                status: true,
                token,
            });
        }
        else
        {
            res.json({
                message:"Password is wrong",
                status: false
            });
        }
    }
}