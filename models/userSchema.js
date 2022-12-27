const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    middlename: {
        type: String,
        
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
    },
    createdTime: {
        type: String,
    },
    updatedTime: {
        type: String,
    },
    
},{strict:false});

const users = new mongoose.model("users",userSchema);


module.exports = users;