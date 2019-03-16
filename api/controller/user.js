const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.users_signup = (req, res, next) => {
    
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id : new mongoose.Types.ObjectId(),
                fullName: req.body.fullName,
                email:req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                //   req.session.fullName=req.body.fullName;
                //   req.session.email=req.body.email;
                //   req.session.time=1;
                  const token = jwt.sign({
                    email: result.email,
                    userId: result._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                  )
                //   res.setHeader('Content-type','application/json')
                //   res.setHeader('Authorization','Bearer '+token)
                  console.log(result);
                  res.status(201).json({
                    message: "User created",
                    createUser: user,
                    token: token
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  }

  exports.users_login = (req, res, next)=> {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(404).json({
                message: "Email doesn\'t exist!"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message: "Password doesn't match!"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            )
            
            // res.setHeader('Content-type','application/json')
            // res.setHeader('Authorization','Bearer '+token)
            return res.status(200).json({
                message: "Handling POST requests to /login",
                User : user,
                token: token
              });
            
            }
            res.status(401).json({
                message: "Password doesn't match!"
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        }

    );
}

exports.users_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
    res.status(200).json({
        message: "User deleted"
    });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
    });
}