const Router = require('express')
const {register} = require('../controllers/user.controller')
const validate = require('../middlewares/validate.middleware')
const {regiterValidationSchema} = require('../validation/auth.validation')

const router = Router()

router.post('/register', validate(regiterValidationSchema), register)

module.exports = router