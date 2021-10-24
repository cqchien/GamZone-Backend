const express = require("express")
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const httpStatus = require('http-status')


var app = express()
const AccountModel = require("./models/user")



app.get("/", function(res,res){
    res.json("Home")
})

// https://git.heroku.com/gearzone.git

app.listen( process.env.PORT || 3000, function(){
    console.log("Server start on port ")
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new Exception(httpStatus.NOT_FOUND, 'API Not Found'));
});

app.use(express.urlencoded({extended:false}))
app.use(express.json({}))

// enable cors
app.use(cors())
app.options('*', cors())

mongoose.connect('mongodb+srv://User:jKAN4AS7ExKbs40K@cluster0.nmd9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err) {
    if(err){
        console.log("Cannot connect to mongodb")
    }
    else{
        console.log("Connection created")
    }
});

require("./routes/registration")(app)
require("./routes/login")(app)