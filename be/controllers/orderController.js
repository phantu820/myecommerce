const Order = require("../models/Order");

async function getAllOrders(req, res) {
    try {
        const allOrders = await Order.find().populate({
            path: "owner",
            select: ["name", "email"],
            model: "User"
        });
        res.status(200).json(allOrders);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function createOrder(req, res) {
    const io = req.app.get('socketio');
    const { userId, cart, country, address } = req.body;
    try {
        const user = await User.findById(userId);
        const order = await Order.create({ owner: user._id, products: cart, country, address });
        order.count = cart.count;
        order.total = cart.total;
        await order.save();
        user.cart = { total: 0, count: 0 };
        user.orders.push(order);
        const notification = { status: 'unread', message: `New order from ${user.name}`, time: new Date() };
        io.sockets.emit('new-order', notification);
        user.markModified('orders');
        await user.save();
        res.status(200).json(user)

    } catch (e) {
        res.status(400).json(e.message)
    }
}

async function orderShipping(req, res) {
    const io = req.app.get('socketio');
    const { ownerId } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(ownerId);
        await Order.findByIdAndUpdate(id, { status: 'shipped' });
        const orders = await Order.find().populate('owner', ['email', 'name']);
        const notification = { status: 'unread', message: `Order ${id} shipped with success`, time: new Date() };
        io.sockets.emit("notification", notification, ownerId);
        user.notifications.push(notification);
        await user.save();
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e.message);
    }
}

module.exports = {
    getAllOrders, createOrder, orderShipping
}