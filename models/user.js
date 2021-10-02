const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    dob: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String, required: true, unique: true, lowercase: true},
    avatar: {type: String}
});

module.exports =  mongoose.model("User", userSchema);

