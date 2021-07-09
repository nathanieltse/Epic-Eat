const express = require('express');
const router = express.Router();

require('dotenv').config();

router.post('/booking/:userId/:restaurantId', (_req,res)=>{
    res.status(200).json("message : restaurant booked")
})


module.exports = router;