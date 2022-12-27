const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");




// register 

router.post("/register1",async(req,res)=>{

    const {firstname,middlename,lastname, email, password,role,department,createdTime} = req.body;
   

    if(!firstname||!lastname||!email||!password||!role||!department||!createdTime){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users({
                firstname,middlename,lastname, email, password,role,department,createdTime
            });
            console.log("yes")

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser,"adduser");
        }

    } catch (error) {
        res.status(422).json(error);
    }
})

router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;

    try {
        const preuser = await users.findOne({email:email});
        console.log(preuser,"presuser");
        res.status(201).json(preuser)
        if (preuser.password==password){
            console.log(preuser.password)
            
            console.log("done")
        }
        else{
            res.status(422).json("password is incorrect");
        }
    
    } catch (error) {
        res.status(422).json(error);
    }
})
// get userdata

router.get("/getalldata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/getclientdata",async(req,res)=>{
    try {
        const userdata = await users.find({role:"client"});
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/getadmindata",async(req,res)=>{
    try {
        const userdata = await users.find({role:"admin"});
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})
// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id,"id");

        
        const updateduser = await users.findOneAndUpdate({"_id":{$gte:id}},{$set:req.body})

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})







module.exports = router;










