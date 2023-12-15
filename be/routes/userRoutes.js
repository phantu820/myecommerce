const router = require("express").Router();
const userController = require("../controllers/userController");

//sign up
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getUsers);
router.get("/:id/orders", userController.getUserOrders);
router.post("/:id/updateNotifications", userController.updateUserNotifications);

module.exports = router;
