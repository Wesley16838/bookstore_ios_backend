const express = require('express')
const router = express.Router()

const multer = require('multer')
const checkAuth = require('../middleware/check_auth')
const BookController = require('../controller/books')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb){
        cb(null,new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage:storage, 
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})

router.get('/',BookController.books_get_all)

router.post('/', checkAuth, upload.single('bookImage'), BookController.books_create_book )

router.get('/search',BookController.books_get_books)

router.get('/:bookId',BookController.books_get_book)


///Send array to this endpoint [{"propName":"name", "value":"blabla"}]
router.patch('/:bookId', checkAuth, BookController.books_update_book)

router.delete('/:bookId', checkAuth,BookController.books_delete_book)

module.exports = router;

