const User = require("../models/User");

async function signup(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        res.json(user);
    } catch (e) {
        if (e.code === 11000) return res.status(400).send('Email already exists');
        res.status(400).send(e.message)
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.json(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders');
        res.json(users);
    } catch (e) {
        res.status(400).send(e.message);
    }
}
async function getUserOrders(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('orders');
        res.json(user.orders);
    } catch (e) {
        res.status(400).send(e.message);
    }
}
async function updateUserNotifications(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        user.notifications.forEach((notif) => {
            notif.status = "read"
        });
        user.markModified('notifications');
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    signup, login, getUsers, getUserOrders, updateUserNotifications
}