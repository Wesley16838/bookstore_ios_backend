const express = require('express')
const router = express.Router()
const Signup = require('../models/signup')
const mongoose = require('mongoose')
const Token = require('../../helper/token')

router.post('/',(req,res,next)=>{
    const token = Token.generate(req.body)
    const signup = new Signup({
        _id : new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email:req.body.email,
        password: req.body.password,
        address: req.body.address

    })
    signup
        .save()
        .then(result => {
        console.log(result);
        res.setHeader('Content-Type','application/json')
        res.setHeader('Authorization',token)
        res.status(200).json({
            message: "Handling POST requests to /signup",
            createdUser: result
          });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
})

router.get('/:userId',(req,res,next)=>{
    const id = req.params.userId
    if(id == 'special'){
        res.status(200).json({
            message: 'Handling Get requests to special ID!'
        })
    }else{
        res.status(200).json({
            message: 'You passes an ID'
        })
    }
    
})

module.exports = router;

