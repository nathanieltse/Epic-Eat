const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

require('dotenv').config();

router.get('/user', (req,res)=>{
    const {userName, password} = req.query
    User
        .find({userName:userName, password:password},(err,found) => {
            if(err) return res.statusMessage(500).json("user server error")
            if(found.length) return  res.status(200).json(found)
            if (!found.length) return res.status(400).json("user not exsist")
        })
    
})

router.post('/user', (req, res) => {
    const {userName, password, firstName, lastName} = req.body
    if (!userName || !password || !firstName || !lastName ) return res.status(400).json("empty field")

    User
        .find({userName: userName}, (err, found) => {
            if(found.length) return res.status(400).json("username already exsist")
            if(err) return res.statusMessage(500).json("user server error")
            User
                .create({
                    userName : userName,
                    password:  password,
                    firstName:  firstName,
                    lastName:  lastName
                })
                .then(user => res.status(200).json(user))
                .catch(err => res.status(500).json(err))
        })
})


module.exports = router;