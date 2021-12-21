const { Router } = require("express");
const authRoute = require("./auth.routes");
const customerRoute = require("./customer.routes");

const router = Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/customer",
    route: customerRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
