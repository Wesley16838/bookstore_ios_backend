const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const checkAuth = require('../middleware/check_auth')
// const Token = require('../../helper/token')  // const token = Token.generate(req.body)
//////Sign up endpoint
router.post("/signup", UserController.users_signup );

//////Login endpoint
router.post('/login',UserController.users_login);

router.delete("/:userId", checkAuth, UserController.users_delete_user);
  

module.exports = router;

