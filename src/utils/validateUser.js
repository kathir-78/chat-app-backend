import validator from "validator"
import User from "../models/userModel.js";

// api level validation

// validate user creation
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

// validate user login
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

// validate user edit
const validateEditUser = (req, res, next) => {
    const { firstName, lastName, gender, imageUrl, about } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: "First name and last name are required" });
    }

    const validGenders = ["Male", "Female", "Others"];
    if (gender && !validGenders.includes(gender)) {
        return res.status(400).json({ message: "Invalid gender value" });
    }

    if (imageUrl && !validator.isURL(imageUrl)) {
        return res.status(400).json({ message: "Invalid image URL" });
    }

    if (about && about.length > 1000) {
        return res.status(400).json({ message: "About section must be less than 1000 characters" });
    }

    next();
};

export {validateUserCreation, validateUserLogin, validateEditUser};