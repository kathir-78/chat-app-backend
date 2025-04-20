import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js';


//login
const login =  async(req, res) => {
    try {
        const { emailId, password } = req.body;
        const userData = await User.findOne({emailId})

        if(!userData) {
            return res.status(403).json({message: "User not found"});
        }

        const hassedPassword = userData.password
        const isPasswordMatch = await bcrypt.compare(password, hassedPassword);

        if(!isPasswordMatch) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const jwttoken = jwt.sign({FirstName: userData.firstName, emailId: userData.emailId, id: userData._id}, process.env.JWT_SECRETE_KEY, {expiresIn: '7d'});

        const {firstName, lastName, imageUrl, about, gender, _id} = userData;
        res.status(200)
            .clearCookie("token")
            .cookie("token", jwttoken, 
                { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true})
            .json({firstName, lastName, imageUrl, about, gender, _id});

    } catch (error) {
        res.status(500).send(error.message)
    }
}

//signUp
 const signUp = async(req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
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

//view profile
const profile = async(req, res) => {
    try {
        const { firstName, lastName,  imageUrl, about, gender ,_id } = req.user;

        res.status(200).json({firstName, lastName, imageUrl, about, gender,_id });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the profile", error: error.message });
    }
}

//Edit profile
const editProfile = async (req, res) => {
    try {
        const { firstName, lastName, gender, imageUrl, about } = req.body;
        const { _id } = req.user;

        const updatedFields = {};
        if (firstName) updatedFields.firstName = firstName;
        if (lastName) updatedFields.lastName = lastName;
        if (gender) updatedFields.gender = gender;
        if (imageUrl) updatedFields.imageUrl = imageUrl;
        if (about) updatedFields.about = about;

        const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const { firstName: updatedFirstName, lastName: updatedLastName, gender: updatedGender, about: updatedAbout, imageUrl: updatedImageUrl } = updatedUser;

        res.status(200).json({ 
            message: "Profile updated successfully", 
            user: { 
                firstName: updatedFirstName, 
                lastName: updatedLastName, 
                gender: updatedGender, 
                about: updatedAbout,
                imageUrl: updatedImageUrl
            } 
        });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the profile", error: error.message });
    }
};

export  { login, signUp, logout, profile, editProfile };