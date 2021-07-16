const express = require('express');
const router = express.Router();
const axios = require('axios')
const User = require('../models/userModel')
const auth = require('../middlewares/auth')

require('dotenv').config();

router.get('/recommendation', auth, (req,res) => {
    const {latitude, longitude, reason, mealtime} = req.query
    User
        .find({_id:req.decoded.id})
        .then(result => {
            if (!result.length) return res.status(400).json({message:"cant find user info"})
            result[0].categories.sort((a,b) => b.rate - a.rate)
            let topCategory = []
            let selectIndex = Math.floor(Math.random() * 5)
            result[0].categories.forEach((category, i) =>{
                if(i < 6){
                    topCategory.push(category.category)
                }
            })
            responseData=[]
            axios
                .get(`https://api.yelp.com/v3/businesses/search?term=restaurants,${reason},${topCategory[selectIndex]}&open_now=true&limit=25&latitude=${latitude}&longitude=${longitude}`,{
                    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
                })
                .then(data =>{
                    data.data.businesses.map(data => responseData.push(data))
                    return axios
                                .get(`https://api.yelp.com/v3/businesses/search?term=restaurants,${reason},${topCategory[selectIndex]}&open_now=true&limit=25&latitude=${latitude}&longitude=${longitude}`,{
                                    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
                                })
                                .then(data =>{
                                    data.data.businesses.map(data => responseData.push(data))
                                    return axios
                                                .get(`https://api.yelp.com/v3/businesses/search?term=restaurants,${reason},${topCategory[selectIndex]}&open_now=true&limit=25&latitude=${latitude}&longitude=${longitude}`,{
                                                    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
                                                })
                                                .then(data =>{
                                                    data.data.businesses.map(data => responseData.push(data))
                                                    return axios
                                                                .get(`https://api.yelp.com/v3/businesses/search?term=restaurants,${reason},${topCategory[selectIndex]}&open_now=true&limit=25&latitude=${latitude}&longitude=${longitude}`,{
                                                                    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
                                                                })
                                                                .then(data =>{
                                                                    data.data.businesses.map(data => responseData.push(data))
                                                                    return axios
                                                                                .get(`https://api.yelp.com/v3/businesses/search?term=restaurants,${reason}&open_now=true&limit=25&latitude=${latitude}&longitude=${longitude}`,{
                                                                                    headers: { Authorization: `Bearer ${process.env.API_KEY}` }
                                                                                })
                                                                                .then(data =>{
                                                                                    data.data.businesses.map(data => responseData.push(data))
                                                                                    res.status(200).json(responseData)
                                                                                })
                                                                })
                                                })
                                })
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