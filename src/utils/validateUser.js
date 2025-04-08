import validator from "validator"
import User from "../models/userModel.js";

// api level validation

const validateUserCreation = async (req, res, next)=> {

    const {firstName, lastName, emailId, password} = req.body
        
    if(!firstName || !lastName || !emailId || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
        
    if( !validator.isEmail(emailId)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await User.findOne({ emailId });
        if (user) {
            return res.status(409).json({ message: "Email already exists" });
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

const validateUserLogin = (req, res, next)=> {

    const { emailId, password} = req.body;

    if(!emailId || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if( !validator.isEmail(emailId)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    
    next()
}

export {validateUserCreation, validateUserLogin};