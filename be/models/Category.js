import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;