const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    fistName: String,
    lastName: String,
    bookings:   [String],
    categories: [Object]
})

const User = mongoose.model("User", UserSchema)

module.exports = User


