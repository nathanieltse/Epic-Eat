const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/recommendation/:userId', (_req,res)=>{
    res.status(200).json("restaurant")
})

router.post('/recommendation/:userId/:category', (_req,res)=>{
    res.status(200).json("message: category rateing updated!")
})


module.exports = router;