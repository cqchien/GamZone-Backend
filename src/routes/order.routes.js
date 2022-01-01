const Router = require("express");
const { createOrder, getListOrdersOfCustomer, getOrderDetail } = require("../controllers/order.controller");
const checkToken = require("../middlewares/checkToken.middleware");

const router = Router();

router.use(checkToken);

router.post('/', createOrder);
router.get('/', getListOrdersOfCustomer);
router.get('/:id', getOrderDetail);

module.exports = router;
