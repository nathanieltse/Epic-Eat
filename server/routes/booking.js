const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const auth = require('../middlewares/auth')
const {v4 : uuid} = require('uuid');

require('dotenv').config();

router.post('/booking', auth, (req,res) => {
    const {id,restaurant, image, date} = req.body
    User
        .findByIdAndUpdate(req.decoded.id,{$push:{"bookings":{
            "id":id,
            "bookingID":uuid(),
            "restaurant":restaurant,
            "image":image,
            "date":date
        }}}, {new: true})
        .select('-password')
        .then(result => {
            if (!result) return res.status(400).json({message:"cant find user info"})
            result.bookings.sort((a,b) =>  a.date-b.date)
            result.categories.sort((a,b)=> b.rate-a.rate)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, "get booking route")
            res.status(500).json({message:"user server error"})
        })
})

router.delete('/booking', auth, (req,res) => {
    const {id} = req.body
    User
        .findByIdAndUpdate(req.decoded.id,{$pull:{"bookings": {bookingID: id}}}, {new: true})
        .select('-password')
        .then(result => {
            if (!result) return res.status(400).json({message:"cant find user info"})
            result.bookings.sort((a,b) =>  a.date-b.date)
            result.categories.sort((a,b)=> b.rate-a.rate)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, "delete booking route")
            res.status(500).json({message:"user server error"})
        })
})


module.exports = router;