const express = require('express')
const router = express.Router()
const Signup = require('../models/login')
const mongoose = require('mongoose')

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling Get requests to /signup!'
    })
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

