import mongoose from "mongoose";
import validator from 'validator'

const { Schema, model} = mongoose;

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        MaxLength: 255
    },

    lastName: {
        type: String,
        required: true,
        MaxLength: 255
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
    }
},
{
    timestamps: true
})

const User = model('User', userSchema);
export default User;
