const User = require("../models/User");

async function signup(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (e) {
        if (e.code === 11000) return res.status(400).send('Email already exists');
        res.status(400).send(e.message);
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getUsers(req, res) {
    try {
        const getUsers = await User.find({ isAdmin: false }).populate("orders");
        res.status(200).json(getUsers);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function getUserOrders(req, res) {
    const { id } = req.params;
    try {
        const getUserOrders = await User.findById(id).populate("orders");
        res.status(200).json(getUserOrders);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function updateNotifications(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        user.notifications.forEach(element => {
            element.status = "read";
        });
        user.markModified("notifications");
        await user.save();
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    signup, login, getUsers, getUserOrders, updateNotifications
};
