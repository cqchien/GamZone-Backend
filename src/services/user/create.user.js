const bcrypt = require('bcryptjs')
const { model } = require('mongoose')
const User = require('../../models/user')
//name, password, dob, address, phone, email, avatar
const createUser = async ({
    name, password, dob, address, phone, email, avatar
  }) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
        name, 
        password: hash, 
        dob, 
        address, 
        phone, 
        email, 
        avatar
    });
  
    return newUser;
  };

module.exports = createUser