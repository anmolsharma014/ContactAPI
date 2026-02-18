import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../model/User.js';

export const isAuthenticate = async (req, res, next) => {
    const token = req.header('Auth')
    if (!token) {
        res.json({
            message: 'Not Authorized, login first', status: false
        })
    } else {
        const decoded = jwt.verify(token, process.env.TOKEN)
        let userid = decoded.userId

        let findUser = await User.findOne({ userid })
        if(!findUser){
            res.json({
                message:'user not found',status:false
            })
        }
        req.userdata=findUser;
        next()
    }
}