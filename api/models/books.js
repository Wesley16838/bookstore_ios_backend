const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookName: { type: String, require: true,unique: true },
    bookAuthor:{ 
        type: String, 
        require: true
    },
    bookImage: { type: String, require: true },
    bookPrice: { type: Number, require:true},
    bookGenre:[{type: String}],
    bookSummary:{ type: String, require:true},
    bookISBN:{ type: String, require:true,unique: true},
    bookUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Book', bookSchema);