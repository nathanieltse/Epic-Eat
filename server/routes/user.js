const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

require('dotenv').config();

router.get('/user/:username', (_req,res)=>{
    res.status(200).json(user)
})

router.post('/user', (req, res) => {
    const {userName, password, firstName, lastName} = req.body
    if (!userName || !password || !firstName || !lastName ) return res.status(400).json("empty field")

    User
        .find({userName: userName}, (err, found) => {
            if(found.length) return res.status(400).json("username already exsist")
            
            User
                .create({
                    userName : userName,
                    password:  password,
                    fistName:  firstName,
                    lastName:  lastName
                })
                .then(user => res.status(200).json(user))
                .catch(err => res.status(500).json(err))
        })
})


module.exports = router;