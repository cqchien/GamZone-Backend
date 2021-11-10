const { Router } = require('express');
// const config = require('../config/config');
const authRoute = require('./auth.routes');
const productRoute = require('./product.routes')
// const docsRoute = require('./docs.routes');
// const userRoute = require('./user.routes');

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },

  {
    path:'/product',
    route: productRoute
  }
//   {
//     path: '/user',
//     route: userRoute,
//   },
];

// const devRoutes = [
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;