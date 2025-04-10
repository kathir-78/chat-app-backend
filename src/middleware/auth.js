import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const isAuthenticated = async(req, res, next)=> {

    try {
        
        const { token } = req.cookies;
    
        if(!token) {
            return res.status(401).send("Not Authenticated");
        }
    
        const docodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    
        //console.log(docodedToken);
    
        const userData = await User.findById(docodedToken.id);

        if (!userData) {
            return res.status(404).send("User not found");
        }

        req.user = userData;

        next();

    } catch (error) {
        res.status(401).send("Invalid token");
    }
}

export default isAuthenticated;