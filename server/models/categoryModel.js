const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category: String
})

const Category = mongoose.model("Category", CategorySchema)

module.exports = Category


