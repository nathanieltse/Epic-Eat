const express = require('express');
const router = express.Router();
const axios = require('axios')

require('dotenv').config();

router.get('/location' ,(req,res) => {
    const {latitude, longitude} = req.query

    axios
        .get(`https://api.geocod.io/v1.6/reverse?q=${latitude},${longitude}&api_key=${process.env.GEO_API}`)
        .then(data => res.status(200).json(data.data.results[0].formatted_address))
        .catch(err => res.status(500).json({message:"search location error"}))
})


module.exports = router;