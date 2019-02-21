const express = require('express')
const router = express.Router()



router.get('/',(req, res, next) => {
    res.status(200).json({
        message: "Handling Get request to /product"
    })
})

router.post('/',(req, res, next) => {

   
    const book = {
         name:  req.body.name,
         price:  req.body.price
    }
    res.status(201).json({
        message: "Handling Post request to /product",
        createBook: book
    })
})

router.get('/:productId',(req, res, next) => {
    const id = req.params.productId
    if(id === 'special'){
        res.status(200).json({
            message: "Handling Get request to /product",
            id:id
        })
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:productId',(req, res, next) => {
   
        res.status(200).json({
            message: "Update product!"
          
    })
})

router.delete('/:productId',(req, res, next) => {
   
    res.status(200).json({
        message: "Product deleted!"
      
})
})

module.exports = router;

