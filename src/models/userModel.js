import mongoose from "mongoose";
import validator from 'validator'

const { Schema, model} = mongoose;

const userSchema = new Schema ({

    firstName: {
        type: String,
        required: true,
        MaxLength: 255,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        MaxLength: 255,
        trim: true
    },

    emailId: {
        type: String,
        required: true,
        MaxLength: 50,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error ('invalid email address');
            }  
        }
    },

    password: {
        type: String,
        required: true,
        MaxLength: 1024 // hashed password length
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others']
    },

    imageUrl: {
        type: String,
        validator: (value)=> validator.isURL(value),
        message: 'Invalid URL',
        default: "https://chat-app-s3bucket.s3.eu-north-1.amazonaws.com/user.png"
    },

    about: {
        type: String,
        MaxLength: 1000
    }
},
{
    timestamps: true
})

const User = model('User', userSchema);
export default User;
