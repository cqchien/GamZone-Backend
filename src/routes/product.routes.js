const Router = require("express");
const role = require("../constant/role");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");
const authorize = require("../middlewares/auth.middleware");
const checkToken = require("../middlewares/checkToken.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createProductValidationSchema,
} = require("../validation/product.validation");

const router = Router();

router.get("/", getAllProducts);

router.use(checkToken);

router.post(
  "/",
  authorize(role.ADMIN),
  validate(createProductValidationSchema),
  createProduct
);

module.exports = router;
