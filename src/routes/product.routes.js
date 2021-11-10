const Router = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");
const checkToken = require("../middlewares/checkToken.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createProductValidationSchema,
} = require("../validation/product.validation");

const router = Router();

router.get("/", getAllProducts);

router.use(checkToken);

router.post("/", validate(createProductValidationSchema), createProduct);

module.exports = router;
