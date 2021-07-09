const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/restaurants/:location',(req,res) => {
    const location = req.params.location
    axios
        .get(`https://api.yelp.com/v3/businesses/search?latitude=${1}&longitude=${1}`)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router;