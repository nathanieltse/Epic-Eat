const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

require('dotenv').config();

router.get('/user/:username', (_req,res)=>{
    res.status(200).json(user)
})

router.post('/user', (req, res) => {
    const {userName, password, firstName, lastName} = req.body
    User
        .create({
            userName : userName,
            password:  password,
            fistName:  firstName,
            lastName:  lastName
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err))
})


module.exports = router;