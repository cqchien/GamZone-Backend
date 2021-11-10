const Router = require("express");
const {createProduct, getAllProducts} = require("../controllers/product.controller");
const validate = require("../middlewares/validate.middleware");
const { createProductValidationSchema } = require("../validation/product.validation");

const router = Router();

router.post("/createProduct", validate(createProductValidationSchema), createProduct)
router.get("/getAllProducts",getAllProducts)

module.exports = router;