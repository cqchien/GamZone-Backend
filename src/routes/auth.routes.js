const Router = require('express')
const register = require('../controllers/user.controller')
const validate = require('../middlewares/validate.middleware')
const registerValidationSchema = require('../validation/auth.validation')

const router = Router()

router.post('/register',validate(registerValidationSchema),register)

module.exports = router