const {Router} = require('express')
const config = require('../config/config')
const authRoute = require('./auth.routes')

const router = Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    }
]

defaultRoutes.forEach(function(route){
    router.use(route.path, route.route)
})

module.exports = router