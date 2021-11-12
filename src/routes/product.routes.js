const Router = require("express");
const role = require("../constant/role");
const {
  createProduct,
  getAllProducts,
  updateProductInfo
} = require("../controllers/product.controller");
const authorize = require("../middlewares/auth.middleware");
const checkToken = require("../middlewares/checkToken.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createProductValidationSchema, updateProductValidationSchema
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

router.patch(
  '/:id',
  authorize(role.ADMIN),
  validate(updateProductValidationSchema),
  updateProductInfo
)

module.exports = router;
