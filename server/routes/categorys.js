const express = require('express')
const router = express.Router()
const Categories = require('../models/categoryModel')

require('dotenv').config()

router.get('/categories', (_req,res)=>{
    Categories
        .find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json("server error"))
    
})

//initial data for categorys
// router.post('/categorys',(req, res) => {
//     req.body.categorys.map(item => {
//         Categories
//         .create({
//             category: item,
//         })
//         .then(data => res.status(200).json(data))
//         .catch(err => res.status(400).json(err))
//     })
// })



module.exports = router;