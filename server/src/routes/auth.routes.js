const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

/** 
    @route   POST /api/auth/register
    @access  Public 
    @desc    Register a user
*/
authRouter.post("/register",authController.registerUserController)

/**
    @route   POST /api/auth/login
    @access  Public
    @desc    Login a user
*/
authRouter.post("/login", authController.loginUserController)

/** 
 * @route   GET /api/auth/logout
 * @access  Public
 * @desc    Logout a user
  */
authRouter.get("/logout", authController.logoutUserController)

/** 
 * @route   GET /api/auth/get-me
 * @description get the current logged in user detail
 * @access  Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = authRouter