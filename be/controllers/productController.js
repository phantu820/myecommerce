const Product = require("../models/Product");
const User = require("../models/User");

async function getAllProduct(req, res) {
    try {
        const product = await Product.find().sort({ '_id': -1 });
        res.status(201).json(product);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        const similar = await Product.find({ category: product.category }).limit(5);
        res.status(200).json({ product, similar });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function createProduct(req, res) {
    try {
        const { name, description, price, category, images: pictures } = req.body;
        const product = await Product.create({ name, description, price, category, pictures });
        const products = await Product.find();
        res.status(201).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function updateProduct(req, res) {
    const { id } = req.params;
    try {
        const { name, description, price, category, images: pictures } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, pictures });
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const user = await User.findById(user_id);
        if (!user.isAdmin) return res.status(401).json("You don't have permission");
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function filterByCategory(req, res) {
    const { category } = req.params;
    try {
        let product;
        if (category == "all") {
            product = await Product.find().sort({ "_id": 1 });
        } else {
            product = await Product.find({ category }).sort({ "_id": -1 });
        }
        res.status(200).json(product);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function addtoCart(req, res) {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const cart = user.cart;
        if (user.cart[productId]) {
            cart[productId] += 1;
        } else {
            cart[productId] = 1;
        }
        cart.count += 1;
        cart.total = Number(cart.total) + Number(price);
        user.cart = cart;
        user.markModified("cart");
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function increaseCart(req, res) {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        userCart.total += Number(price);
        userCart.count += 1;
        userCart[productId] += 1;
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function decreaseCart(req, res) {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        userCart.total -= Number(price);
        userCart.count -= 1;
        userCart[productId] -= 1;
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

async function removefromCart(req, res) {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        userCart.total -= Number(userCart[productId]) * Number(price);
        userCart.count -= userCart[productId];
        delete userCart[productId];
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports = {
    getAllProduct, getProductById, filterByCategory,
    createProduct, updateProduct, deleteProduct, addtoCart,
    removefromCart, increaseCart, decreaseCart
}