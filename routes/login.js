const User = require("../src/models/user")
var Jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var secret = "secret"
module.exports = function(app){
    app.post("/login", function(req,res){
        User.findOne({
            email: req.body.email
        }, function(err,data){
            if(err){
                res.json({"result": -1, "errMsg": err})
            }
            else {
                if(data){
                    bcrypt.compare(req.body.password, data.password, function(err, resUser) {
                        if(err){
                            res.json({"result": -1, "errMsg": err})
                        }
                        else {
                            if (resUser == true){
                                var Token = Jwt.sign({
                                    dataID: data._id
                                }, secret,{
                                    expiresIn: Math.floor(Date.now()/1000) + 60*60*24*30*12
                                })

                                res.json({"result":1, "errMsg":"Login successfully"})
                            }
                            else{
                                res.json({"result":-1, "errMsg":"Wrong password"})
                            }
                        }
                    });
                }
                else{
                    res.json("user chua dang ky")
                }
            }
        })
    })

    
}