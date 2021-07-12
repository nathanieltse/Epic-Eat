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
    const {userName, password, firstName, lastName, email, phone} = req.body
    if (!userName || !password || !firstName || !lastName || !email || !phone ) return res.status(400).json("empty field")

    User
        .find({userName: userName}, (err, found) => {
            if(found.length) return res.status(400).json("username already exsist")
            if(err) return res.statusMessage(500).json("user server error")
            User
                .create({
                    userName : userName,
                    password:  password,
                    firstName:  firstName,
                    lastName:  lastName,
                    email: email,
                    phone: phone
                })
                .then(user => res.status(200).json(user))
                .catch(err => res.status(500).json(err))
        })
})

router.get('/checkusername', (req,res)=>{
    const { userName } = req.query
    User
        .find({userName:userName},(err,found) => {
            if(err) return res.statusMessage(500).json("user server error")
            if(!found.length) return  res.status(200).json("no one has the same username")
            if (found.length) return res.status(400).json("username already exsist")
        })
})


module.exports = router;