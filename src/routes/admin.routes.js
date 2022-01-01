const Router = require("express");
const { getListOrderForAdmin, updateOrderStatusForAdmin } = require("../controllers/order.controller");
const { doStatisticMonthlyRevenue, doStatisticAnnualRevenue } = require("../controllers/statistic.model");


const router = Router();


router.get("/order", getListOrderForAdmin);
router.post("/order/:id", updateOrderStatusForAdmin);

router.get("/monthly-revenue", doStatisticMonthlyRevenue);
router.get("/annual-revenue", doStatisticAnnualRevenue);

module.exports = router;
