const express = require("express")
var app = express()

app.get("/", function(res,res){
    res.json("Home")
})

app.listen(3000, function(){
    console.log("Server start on port ")
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({extended:false}))
app.use(express.json({}));
