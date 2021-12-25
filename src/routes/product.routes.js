const Router = require("express");
const { getAllProducts } = require("../controllers/product.controller");
const checkToken = require("../middlewares/checkToken.middleware");

const router = Router();
// api: lấy danh sách và phân trang
router.get('/all', getAllProducts);

module.exports = router;
