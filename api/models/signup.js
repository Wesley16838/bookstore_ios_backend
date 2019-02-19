const mongoose = require('mongoose')

const signupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: String,
    email:{ type: String, unique: true },
    password: String,
    Address: String

})

module.exports = mongoose.model('Signup', signupSchema);