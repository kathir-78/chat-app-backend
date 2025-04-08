import express from 'express'
import { login, logout, signUp } from '../controllers/authController.js';
import { validateUserCreation, validateUserLogin } from '../utils/validateUser.js';


const userRoute = express.Router()

// login router
userRoute.post('/auth/login', validateUserLogin, login);

// signUp router
userRoute.post('/auth/signup', validateUserCreation, signUp);

// logout router
userRoute.post('/auth/logout', logout);

export default userRoute