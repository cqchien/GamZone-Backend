const Router = require("express");
const {register,login} = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const { registerValidationSchema,loginValidationSchema } = require("../validation/auth.validation");

const router = Router();

/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Register and Loin API
  */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Return token of users after successfully registration
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 */
router.post("/register", validate(registerValidationSchema), register);

router.post('/login', validate(loginValidationSchema), login);

module.exports = router;
