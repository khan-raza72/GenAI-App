const express = require('express');
const router = express.Router();

// CURLY BRACES {} LAGAANA ZAROORI HAI
const { register, login, logout } = require('../controllers/auth.controller');

//
const { registerUserController, loginUserController, logoutUserController } = require("../controllers/auth.controller")

// console.log("Register Function is:", registerUserController);
console.log("Register Function is:", typeof registerUserController); 

//  
router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post("/logout", logoutUserController);

module.exports = router;