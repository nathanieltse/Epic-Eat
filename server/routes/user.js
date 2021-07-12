const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

require('dotenv').config();

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET;

const signJWTToken = user => {
    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    )
  
    return token;
  }

router.get('/user', (req,res)=>{
    const {userName, password} = req.query
    User
        .find({userName:userName},(err,found) => {
            if(err) return res.statusMessage(500).json({message:"user server error"})
            console.log(found)
            if(found.length) {
                bcrypt.compare(password, found[0].password, (_, success) => {
                    if (success) {
                      const token = signJWTToken(found[0].id);
                      return res.status(200).json({ authToken: token });
                    } else {
                      return res.status(403).json({ message: 'Username/password combination is wrong' });
                    }
                })
            }
            if (!found.length) return res.status(400).json({message:"user doesn't exsist"})
        })
})

router.post('/register', (req, res) => {
    const {userName, password, firstName, lastName, email, phone} = req.body
    if (!userName || !password || !firstName || !lastName || !email || !phone ) return res.status(400).json("empty field")

    User
        .find({userName: userName}, (err, found) => {
            if(found.length) return res.status(400).json({message:"username already exsist"})
            if(err) return res.statusMessage(500).json({message:"user server error"})
            
            bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
                if (err) return res.status(500).json({ message: "encryption error"});
            
                User
                    .create({
                        userName : userName,
                        password:  hashedPassword,
                        firstName:  firstName,
                        lastName:  lastName,
                        email: email,
                        phone: phone
                    })
                    .then(user => {
                        const token = signJWTToken(user.id)
                        res.status(200).json({ authToken: token })
                    })
                    .catch(err => res.status(500).json(err))
            })
        })
})

router.get('/checkusername', (req,res)=>{
    const { userName } = req.query
    User
        .find({userName:userName},(err,found) => {
            if(err) return res.statusMessage(500).json({message:"user server error"})
            if(!found.length) return  res.status(200).json({message:"no one has the same username"})
            if (found.length) return res.status(400).json({message:"username already exsist"})
        })
})


module.exports = router;