const User = require('../../models/user')

const getUserByEmailOrId = async({
    function(id,email){
        const _id = id;
        const query = _id ? { _id } : { email };
        // get all data from table without password
        const user = await userModel.findOne(query);

        return user;
    }
})

module.exports = getUserByEmailOrId