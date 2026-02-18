import express from "express";
//API - /api/contact/save
import {Contact} from "../model/Contact.js";
export const save=async(req,res)=>{
    const{name,email,mobile,bloodgroup}=req.body;
    if(name=="" || email=="" || mobile=="" || bloodgroup=="")
    {
        res.json({message:"All Field Required",status:false});
    }
    else{
        let checkData=await Contact.findOne({email});
        if(!checkData){
            let contact=await Contact.create({
                name,
                email,
                mobile,
                bloodgroup
            });
            res.json({
                message:"Contact save successfully",
                status:true
            });
        }
        else{
            res.json({message:"Contact already exist",status:false});
        }
        
    }
    res.json({message:"It's Working"});
};

//API - /api/contact/getAllContact

export const getContacts=async (req,res)=>{
    let contacts=await Contact.find();
    if(!contacts)
    {
        res.json({message:"No Contact available",status:false});
    }
    else
    {
        res.json({message:"All Contact Fetch",contacts,status:true});
    }
};

//API= /api/contact/getContactById

export const getContactById = async(req,res)=>{
    let id=req.params.id;
    let contacts=await Contact.findById({_id:id});


    if(!contacts)
    {
        res.json({message:"No data found",status:false});
    }
    else
    {
        res.json({message:"Data Fetch successfully",contacts,status:true});
    }
}

//API= /api/contact/update/id

export const updateContactById=async(req,res)=>{
    let id=req.params.id;
    let {name,email,mobile,bloodgroup}=req.body;

    let updateContact=await Contact.findByIdAndUpdate(
        id,
        {
            name,
            email,
            mobile,
            bloodgroup
        },{new:  true},
    );

    if(updateContact)
    {
        res.json({message:"Update contact successfully",status: true});
    }
    else
    {
        res.json({message:"New contact inserted",status: true});
    }
};



export const deleteContactById=async(req,res)=>{
    let id=req.params.id;

    let deleteContact=await Contact.findByIdAndDelete(id);

    if(deleteContact)
    {
        res.json({message:"Deleted contact successfully",status: true});
    }
    else
    {
        res.json({message:"Contact not deleted",status: true});
    }
};