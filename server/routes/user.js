const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const auth = require('../middlewares/auth')

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

router.post('/login', (req,res)=>{
    const {userName, password} = req.body
    User
        .find({userName:userName})
        .then(result => {
            if(result.length) {
                bcrypt.compare(password, result[0].password, (_, success) => {
                    if (success) {
                      const token = signJWTToken(result[0]);
                      return res.status(200).json({ authToken: token });
                    } else {
                      return res.status(403).json({ message: 'Username/password combination is wrong' });
                    }
                })
            }
            if (!result.length) return res.status(400).json({message:"user doesn't exsist"})
        })
        .catch(err => {
            res.statusMessage(500).json({message:"user server error"})
        })
})

router.post('/register', (req, res) => {
    const {userName, password, firstName, lastName, email, phone} = req.body
    if (!userName || !password || !firstName || !lastName || !email || !phone ) return res.status(400).json("empty field")

    User
        .find({userName: userName})
        .then(result => {
            if(result.length) return res.status(400).json({message:"username already exsist"})

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
        .catch(err => {
            res.statusMessage(500).json({message:"user server error"})
        })
})

router.get('/checkusername', (req,res)=>{
    const { userName } = req.query
    User
        .find({userName:userName})
        .then(result => {
            if (result.length) return res.status(400).json({message:"username already exsist"})

            res.status(200).json({message:"no one has the same username"})
        })
        then(err => {
            res.statusMessage(500).json({message:"user server error"})
        })
})


router.get('/user', auth, (req,res) => {
    User
        .find({_id:req.decoded.id})
        .select('-password')
        .then(result => {
            if (!result.length) return res.status(400).json({message:"cant find user info"})
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message:"user server error"})
        })
})

router.put('/user/categories', auth, (req,res) => {
    User
        .findByIdAndUpdate(req.decoded.id,{categories:req.body.categories})
        .select('-password')
        .then(result => {
            console.log(result)
            if (!result) return res.status(400).json({message:"cant find user info"})
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({message:"user server error"})
        })
})

module.exports = router;