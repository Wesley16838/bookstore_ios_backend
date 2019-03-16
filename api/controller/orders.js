const Order = require('../models/order')
const Book = require('../models/books')
const mongoose = require('mongoose')

exports.order_get_all =  (req, res, next) => {
    Order.find()
    .select('bookId quantity _id')
    .populate('bookId')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc =>{
                return {
                    _id:doc._id,
                    book:doc.bookId,
                    quantity:doc.quantity,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'+doc._id
                    }
                }
            }),
           
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
} 

exports.order_create_order = (req, res, next) => {
    Book.findById(req.body.bookId)
    .then(book => {
        if(!book){
            return res.status(404).json({
                message:"Book not found"
            })
        }
        const order = new Order({
            _id:mongoose.Types.ObjectId(), 
            bookId: req.body.bookId,
            quantity: req.body.quantity
       })
       return order.save()
       
    })
    .then(result=>{
        console.log(result)
        res.status(201).json({
            message: 'Order stored',
            createdOrder:{
                _id:result._id,
                bookId:result.bookId,
                quantity:result.quantity
            },
            request:{
                type:'POST',
                url:'http://localhost:3000/orders/'+result._id
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.order_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { bookId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}