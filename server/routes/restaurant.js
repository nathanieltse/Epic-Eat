const express = require('express');
const router = express.Router();
const axios = require('axios')

require('dotenv').config();

router.get('/restaurants',(req,res) => {
    const {latitude, longitude} = req.query
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

router.get('/restaurants/detail',(req,res) => {
    const {id} = req.query
    axios
        .get(`https://api.yelp.com/v3/businesses/${id}`,{
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


module.exports = router;