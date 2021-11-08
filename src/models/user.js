const mongoose = require('mongoose')
const roles = require('../constant/role')


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    address: {type: String},
    phone: {type: String},
    email: {type: String, required: true, unique: true, lowercase: true},
    role: {type: String, enum: [roles.ADMIN, roles.USER], default: 'USER'},
    avatar: {type: String},
    
},
{timestamps:true});

module.exports =  mongoose.model("User", userSchema);

