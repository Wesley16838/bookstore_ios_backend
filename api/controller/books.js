const Book = require('../models/books')
const mongoose = require('mongoose')

exports.books_get_all = (req, res, next) => {
    Book.find()
    .select('bookId bookName bookAuthor bookImage bookPrice bookSummary bookISBN bookUpdated bookGenre _id')
    .exec()
    .then(docs => {
       const response ={
        count: docs.length,
        books: docs.map(doc => {
            return{
                _id: new mongoose.Types.ObjectId(),
                bookId: doc._id,
                bookName:  doc.bookName,
                bookAuthor:  doc.bookAuthor,
                bookImage: doc.bookImage,
                bookPrice: doc.bookPrice,
                bookGenre: doc.bookGenre,
                bookSummary: doc.bookSummary,
                bookISBN: doc.bookISBN,
                bookUpdates: doc.bookUpdates,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/books/'+ doc._id
                }
            }
        })
       } 
       res.status(200).json(response)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
           error:err
        })
    })
    
}

exports.books_create_book = (req, res, next) => {
    // console.log(req.file)
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        bookName:  req.body.bookName,
        bookAuthor:  req.body.bookAuthor,
        bookImage: req.file.path,
        bookPrice: req.body.bookPrice,
        bookGenre: req.body.bookGenre,
        bookSummary: req.body.bookSummary,
        bookISBN: req.body.bookISBN,
        bookUpdates: req.body.bookUpdates
    })
    book.save().then(result=>{
        console.log(result)
    })
    .catch(err => console.log(err))
    res.status(201).json({
        message: "Created book successfully",
        createBook: book
    })
}


exports.books_get_books = (req, res, next) => {
    const keyword = req.body.keyWord
    console.log(keyword)
    Book.find(
        {
            $or : [ { 'bookName' : new RegExp(keyword, 'i') }, { 'bookSummary' : new RegExp(keyword, 'i') } ]
        }
        
    )
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs)
    })
    .catch(err =>{
        console.log(err);
        res.status(200).json({
           error:err
        })
    })
}

exports.books_get_book = (req, res, next) => {
    const id = req.params.bookId
    
    Book.find({_id:id})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json({
            book: doc,
            request:{
                type: 'GET',
                url:'http://localhost:3000/books/'+id
            }
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(200).json({
           error:err
        })
    })
}

exports.books_update_book = (req, res, next) => {
    const id = req.params.bookId
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    } 
    Book.update({_id:id},{$set: updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:'Book updated',
            request:{
                type:'PATCH',
                url:'http://localhost:3000/books/'+id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

exports.books_delete_book = (req, res, next) => {
    const id = req.params.bookId
   Book.remove({_id:id})
   .exec()
   .then(result=>{
       res.status(200).json({
           message:"Book deleted",
           request:{
               type:'DELETE',
               url:'http://localhost:3000/books'+id,
           }
       })
   })
   .catch(err => {
       console.log(err)
       res.status(500).json({
           error : err
       })
   })
}