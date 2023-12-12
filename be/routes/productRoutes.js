const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get(":id", productController.getProductById);
router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/", productController.deleteProduct);
router.get("/category/:categoryId", productController.filterByCategory);
router.post("/add-to-cart", productController.addtoCart);
router.post("/increase-cart", productController.increaseCart);
router.post("/decrease-cart", productController.decreaseCart);
router.post("/remove-from-cart", productController.removefromCart);
module.exports = router;