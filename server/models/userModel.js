const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    bookings:   [Object],
    categories: [Object],
    favourites: [Object]
})

const User = mongoose.model("User", UserSchema)

module.exports = User


