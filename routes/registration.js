const bcrypt = require('bcryptjs')
const User = require("../models/user")


// name: Tester
// pass: Tester123
// email: tester@gmail.com 
module.exports = function(app){
    app.post("/register", function(req,res){
        User.findOne(
            {email: req.body.email},function(err,data){
                if(err){
                    res.json({"result":-1, "errMsg":err})
                }
                else{
                    if(data){
                        res.json({"result": -1, "errMsg": "User has already existed"})
                    }
                    else {
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                if(err){
                                    res.json({"result":-1, "errMsg":err})
                                }
                                else{
                                    var newUser = User({
                                        name: req.body.name,
                                        password: hash,
                                        dob: req.body.dob,
                                        address: req.body.address,
                                        phone: req.body.phone,
                                        email: req.body.email,
                                        avatar: req.body.avatar,
                                    })
                                    newUser.save(function(err){
                                        if(err){
                                            res.json({"result":-1, "errMsg":err})
                                        }
                                        else {
                                            res.json({"result":1, "errMsg":"Registration succeeded"})
                                        }
                                    })
                                }
                            })
                        })
                    }
                }
            }
        
        )
    })
}