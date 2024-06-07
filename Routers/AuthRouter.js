
const express = require("express");
const AuthRouter = express.Router();
const isAuth = require("../Middleware/AuthMiddleWare")
const {
    loginController , 
    registerController,
    logoutController
}  = require("../Controllers/AuthController")

AuthRouter.post('/register',registerController);
AuthRouter.post('/login',loginController);
AuthRouter.post('/logout',isAuth, logoutController);

module.exports = AuthRouter;