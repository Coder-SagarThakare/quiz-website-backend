const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const teacherRoutes = require("./teacher.route");
const adminRoutes = require("./admin.route");

const defaultRoutes = [
  { path: "/auth", route: authRoute }, // base path for auth routes
  { path: "/user", route: userRoute }, // base path for user routes
  { path: "/teacher", route: teacherRoutes }, // base path for teacher routes
  { path: "/admin", route: adminRoutes }, // base path for admin routes
];

defaultRoutes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
