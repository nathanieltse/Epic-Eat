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
                        const tokenInfo = {id: result[0].id}
                        const token = signJWTToken(tokenInfo);
                        return res.status(200).json({ authToken: token });
                    } else {
                        return res.status(403).json({ message: 'Username/password combination is wrong' });
                    }
                })
            }
            if (!result.length) return res.status(400).json({message:"user doesn't exsist"})
        })
        .catch(err => {
            console.log(err, "post login route")
            res.status(500).json({message:"user server error"})
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
                        phone: phone,
                        categories: [
                            { category: 'african', rate: 0 },
                            { category: 'newamerican', rate: 0 },
                            { category: 'brazilian', rate: 0 },
                            { category: 'british', rate: 0 },
                            { category: 'caribbean', rate: 0 },
                            { category: 'chinese', rate: 0 },
                            { category: 'danish', rate: 0 },
                            { category: 'ethiopian', rate: 0 },
                            { category: 'filipino', rate: 0 },
                            { category: 'french', rate: 0 },
                            { category: 'greek', rate: 0 },
                            { category: 'indonesian', rate: 0 },
                            { category: 'irish', rate: 0 },
                            { category: 'italian', rate: 0 },
                            { category: 'japanese', rate: 0 },
                            { category: 'korean', rate: 0 },
                            { category: 'latin', rate: 0 },
                            { category: 'malaysian', rate: 0 },
                            { category: 'mediterranean', rate: 0 },
                            { category: 'mexican', rate: 0 },
                            { category: 'mideastern', rate: 0 },
                            { category: 'egyptian', rate: 0 },
                            { category: 'persian', rate: 0 },
                            { category: 'polish', rate: 0 },
                            { category: 'russian', rate: 0 },
                            { category: 'spanish', rate: 0 },
                            { category: 'taiwanese', rate: 0 },
                            { category: 'thai', rate: 0 },
                            { category: 'turkish', rate: 0 },
                            { category: 'vietnamese', rate: 0 }
                        ]
                    })
                    .then(user => {
                        const tokenInfo = {id: user.id}
                        const token = signJWTToken(tokenInfo);
                        res.status(200).json({ authToken: token })
                    })
                    .catch(err => res.status(500).json(err))
            })
        })
        .catch(err => {
            console.log(err, "post register route")
            res.status(500).json({message:"user server error"})
        })
})

router.get('/checkusername', (req,res)=>{
    const { userName } = req.query
    User
        .find({userName:userName})
        .then(result => {
            if (result.length){ 
                return res.status(400).json({message:"username already exsist"})
            } else {
                res.status(200).json({message:"no one has the same username"})
            }
        })
        .catch(err => {
            console.log(err,"get checkusername route")
            res.status(500).json({message:"user server error"})
        })
})


router.get('/user', auth, (req,res) => {
    User
        .find({_id:req.decoded.id})
        .select('-password')
        .then(result => {
            if (!result.length) return res.status(400).json({message:"cant find user info"})
            result[0].bookings.sort((a,b) =>  a.date-b.date)
            result[0].categories.sort((a,b)=>  b.rate-a.rate)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err,"get user route")
            res.status(500).json({message:"user server error"})
        })
})

router.put('/user/categories', auth, (req,res) => {
    User
        .findByIdAndUpdate(req.decoded.id,{categories:req.body.categories})
        .select('-password')
        .then(result => {
            if (!result) return res.status(400).json({message:"cant find user info"})
            result.bookings.sort((a,b) =>  a.date-b.date)
            result.categories.sort((a,b)=> b.rate-a.rate)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, "put categories route")
            res.status(500).json({message:"user server error"})
        })
})

router.put('/user/favourites', auth, (req,res) => {
    const {favourite} = req.body
    User
        .findByIdAndUpdate(req.decoded.id,{$push:{favourites:favourite}}, {new: true})
        .select('-password')
        .then(result => {
            if (!result) return res.status(400).json({message:"cant find user info"})
            result.bookings.sort((a,b) =>  a.date-b.date)
            result.categories.sort((a,b)=> b.rate-a.rate)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, "put favourites route")
            res.status(500).json({message:"user server error"})
        })
})

router.delete('/user/favourites', auth, (req,res) => {
    const {id} = req.body
    User
        .findByIdAndUpdate(req.decoded.id,{$pull:{favourites: {id: id}}}, {new: true})
        .select('-password')
        .then(result => {
            if (!result) return res.status(400).json({message:"cant find user info"})
            result.bookings.sort((a,b) =>  a.date-b.date)
            result.categories.sort((a,b)=> b.rate-a.rate)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, "delete favourites route")
            res.status(500).json({message:"user server error"})
        })
})


module.exports = router;