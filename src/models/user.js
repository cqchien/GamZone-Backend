const mongoose = require('mongoose')
const roles = require('../constant/role')


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    dob: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String, required: true, unique: true, lowercase: true},
    role: {type: String, enum: [roles.ADMIN, roles.USER], default: 'USER'},
    avatar: {type: String}
});

module.exports =  mongoose.model("User", userSchema);

