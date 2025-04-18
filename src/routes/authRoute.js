import express from 'express'
import { editProfile, login, logout, profile, signUp } from '../controllers/authController.js';
import { validateEditUser, validateUserCreation, validateUserLogin } from '../utils/validateUser.js';
import isAuthenticated from '../middleware/auth.js';


const authRoute = express.Router()

// login router
authRoute.post('/auth/login', validateUserLogin, login);

// signUp router
authRoute.post('/auth/signup', validateUserCreation, signUp);

// logout router
authRoute.post('/auth/logout', logout);

// profile view
authRoute.get('/user/profile', isAuthenticated, profile);

// Edit profile
authRoute.patch('/user/profile/edit', isAuthenticated, validateEditUser, editProfile);

export default authRoute