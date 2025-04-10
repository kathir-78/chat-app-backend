import express from 'express'
import { login, logout, profile, signUp } from '../controllers/authController.js';
import { validateUserCreation, validateUserLogin } from '../utils/validateUser.js';
import isAuthenticated from '../middleware/auth.js';


const userRoute = express.Router()

// login router
userRoute.post('/auth/login', validateUserLogin, login);

// signUp router
userRoute.post('/auth/signup', validateUserCreation, signUp);

// logout router
userRoute.post('/auth/logout', logout);

// profile view
userRoute.get('/user/profile', isAuthenticated, profile)

export default userRoute