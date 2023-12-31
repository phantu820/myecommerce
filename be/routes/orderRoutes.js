const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders)
router.post("/", orderController.createOrder);
router.patch("/:id/mark-shipped", orderController.orderShipping);

module.exports = router;

