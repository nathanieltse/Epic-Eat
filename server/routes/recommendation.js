const express = require('express');
const router = express.Router();
const axios = require('axios')
const User = require('../models/userModel')
const auth = require('../middlewares/auth')

require('dotenv').config();

router.get('/recommendation/:userId', (_req,res)=>{
    res.status(200).json("restaurant")
})

router.post('/recommendation', auth, (req,res) => {
    const {latitude, longitude, reason, mealtime} = req.query
    User
        .findByIdAndUpdate(req.decoded.id)
        .select('-password')
        .then(result => {
            if (!result) return res.status(400).json({message:"cant find user info"})
            result.categories.sort((a,b) =>  a.rate-b.rate)
            axios
                .get(`https://api.yelp.com/v3/businesses/search?term=restaurants&open_now=true&limit=50&latitude=${latitude}&longitude=${longitude}`,{
                    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
                })
                .then(data =>{
                    res.status(200).json(data.data)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({message:"can't look up restaurant"})
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message:"user server error"})
        })
})

    



module.exports = router;