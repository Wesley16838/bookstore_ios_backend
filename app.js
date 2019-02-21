const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRoutes = require('./api/routes/user')
const booksRoutes = require('./api/routes/books')
const ordersRoutes = require('./api/routes/orders')
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/booktown',{ useNewUrlParser: true})
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err => console.error('Cannot connect to MongoDB...', err))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')//Content-type & Authorization
    if(req.method === 'option'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, PATCH')
        return res.status(200).json({})
    }
    next();
})

///user router
app.use('/user', userRoutes);

///books router
app.use('/books', booksRoutes);

///orders router
app.use('/orders', ordersRoutes);

///no router here
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status = 404 ;
    next(error)
})

app.use((error,req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app