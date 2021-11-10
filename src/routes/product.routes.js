const Router = require("express");
const {createProduct} = require("../controllers/product.controller");
const validate = require("../middlewares/validate.middleware");
const { createProductValidationSchema } = require("../validation/product.validation");

const router = Router();

router.post("/createProduct", validate(createProductValidationSchema), createProduct);

module.exports = router;