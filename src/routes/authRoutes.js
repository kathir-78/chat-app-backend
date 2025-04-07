import express from 'express'

const userRoute = express.Router()

// login
userRoute.post('/auth/login');

// signUp
userRoute.post('/auth/signup');

// logout
userRoute.post('/auth/logout');

export default userRoute