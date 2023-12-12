const router = require("express").Router();

router.use("/user", require("./userRoutes"));
// router.use("/product", require("./productRoutes"));
// router.use("/order", require("./orderRoutes"));
// router.use("/image", require("./imageRoutes"));
// router.use("/category", require("./categoryRoutes"));

module.exports = router;