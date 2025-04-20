import express from 'express'
import isAuthenticated from '../middleware/auth.js';
import { getUsers } from '../controllers/userController.js';

const userRoute = express.Router();

// get all the users
userRoute.get('/user', isAuthenticated, getUsers);

export default userRoute;