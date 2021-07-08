const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()

require('dotenv').config()

router.get('/categorys', (req,res)=>{
    axios
        .get('https://api.yelp.com/v3/categories',{
            headers:{
                Authorization: `bearer ${process.env.API_KEY}`
            }
        })
        .then(data => {
            res.status(200).json(data.data)
        })
        .catch(err => {
            console.log(err)
        })
    
})



module.exports = router;