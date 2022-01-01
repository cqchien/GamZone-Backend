const Router = require("express");
const { getListOrderForAdmin, updateOrderStatusForAdmin } = require("../controllers/order.controller");


const router = Router();


router.get("/order", getListOrderForAdmin);

router.get("/order/:id", updateOrderStatusForAdmin);

module.exports = router;
