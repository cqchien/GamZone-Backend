const Router = require("express");
const { getListOrderForAdmin, updateOrderStatusForAdmin } = require("../controllers/order.controller");
const { DoStatisticMonthlyRevenue, DoStatisticAnnualRevenue } = require("../controllers/statistic.model");


const router = Router();


router.get("/order", getListOrderForAdmin);
router.post("/order/:id", updateOrderStatusForAdmin);

router.get("/monthly-revenue", DoStatisticMonthlyRevenue);
router.get("/annual-revenue", DoStatisticAnnualRevenue);

module.exports = router;
