const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:String,
    password: String,
   
})

module.exports = mongoose.model('Login', loginSchema);