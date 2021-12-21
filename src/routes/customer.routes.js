const Router = require("express");
const { getProfile } = require("../controllers/user.controller");
const checkToken = require("../middlewares/checkToken.middleware");

const router = Router();

router.use(checkToken);

router.get("/me", getProfile);

module.exports = router;
