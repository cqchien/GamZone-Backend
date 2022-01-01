const Router = require("express");
const { route } = require("express/lib/application");
const { createOrder, getListOrdersOfCustomer } = require("../controllers/order.controller");
const checkToken = require("../middlewares/checkToken.middleware");

const router = Router();

router.use(checkToken);

router.post('/', createOrder);
router.get('/', getListOrdersOfCustomer);

module.exports = router;
