const express = require("express")
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const config = require('./src/config/config')
const router = require('./routes')

var app = express()
const AccountModel = require("./src/models/user")
const { func } = require("joi")



app.get("/", function(res,res){
    res.json("Home")
})

// https://git.heroku.com/gearzone.git

app.listen( config.port, function(){
    console.log('Server is listening on port ' + config.port)
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

mongoose.connect(config.mongoose.url, config.mongoose.options).then(function(){
    console.log("Connected to MongoDB")
}).catch(function(err){
    console.log('Connection failed with err' + err)
})

// Close server and log
const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server is closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
}

app.use('/', router)
// require("./routes/registration")(app)
// require("./routes/login")(app)