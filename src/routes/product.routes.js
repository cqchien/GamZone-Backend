const Router = require("express");
const { getAllProducts, getProduct } = require("../controllers/product.controller");

const router = Router();
// api: lấy danh sách và phân trang
router.get('/all', getAllProducts);

// api: Lấy 1 sản phẩm theo id
router.get('/:id', getProduct);

module.exports = router;
