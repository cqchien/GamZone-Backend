const Router = require("express");
const { createOrder } = require("../controllers/order.controller");
const checkToken = require("../middlewares/checkToken.middleware");

const router = Router();

router.use(checkToken);

router.post('/', createOrder);

module.exports = router;
