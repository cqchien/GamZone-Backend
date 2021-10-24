const bcrypt = require('bcryptjs')
const { model } = require('mongoose')
const User = require('../../models/user')

const createUser = async({
    function(name, password, dob, address, phone, email, avatar){
        var salt = bcrypt.genSaltSync(10)
        var hashPassword = bcrypt.hashSync(password, salt)
        const newUser = await User.create({
            name,
            hashPassword,
            dob,
            address,
            phone,
            email,
            avatar,
        })
        return newUser
    }
})

module.exports = createUser