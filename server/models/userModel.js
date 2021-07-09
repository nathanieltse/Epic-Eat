const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:   {type: String, unique: true} ,
    password:   {type: String},
    fistName:   {type: String},
    lastName:   {type: String},
    bookings:   [String],
    categories: [Object]
})

const User = mongoose.model("User", UserSchema)

module.exports = User


