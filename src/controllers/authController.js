import userModel from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//login
const login =  async(req, res) => {
    try {
        const { emailId, password } = req.body;
        const userData = await userModel.findOne({emailId})

        if(!userData) {
            return res.status(403).json({message: "User not found"});
        }

        const hassedPassword = userData.password
        const isPasswordMatch = await bcrypt.compare(password, hassedPassword);

        if(!isPasswordMatch) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const jwttoken = jwt.sign({FirstName: userData.firstName, email: userData.emailId}, process.env.JWT_SECRETE_KEY, {expiresIn: '7d'});

        const {firstName, lastName } = userData;
        res.status(200)
            .clearCookie("token")
            .cookie("token", jwttoken, 
                { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true})
            .json({firstName, lastName, emailId});

    } catch (error) {
        res.status(500).send(error.message)
    }
}

//signUp
 const signUp = async(req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            firstName,
            lastName,
            emailId,
            password : hashedPassword
        })
        res.status(200).json({message: "user created successfully"});

    } catch (error) {
        res.status(500).send(error.message);
    }
}

//Logout
 const logout = async(req, res)=> {
    try {
        res.status(200).clearCookie("token").json({message:"successfully logout"})
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export  { login, signUp, logout };  