const express = require('express')
const router = express.Router()
const categorys = require('../data/categoryData.json')
const Categories = require('../models/categoryModel')

require('dotenv').config()

router.get('/categorys', (_req,res)=>{
    res.status(200).json(categorys)
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