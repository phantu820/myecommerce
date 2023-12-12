const router = require("express").Router();

router.use("/users", require("./userRoutes"));
router.use("/images", require("./imageRoutes"));
router.use("/products", require("./productRoutes"));
// router.use("/orders", require("./orderRoutes"));
// router.use("/categories", require("./categoryRoutes"));

module.exports = router;