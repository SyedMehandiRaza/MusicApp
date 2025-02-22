// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.cookies.podcasterUserToken;
//         if( token ) {
//             const decode = jwt.verify(token, process.env.SECRET_KEY);
//             const user = await User.findOne({ _id: decode.id });
//         }

//         if (!user) {
//             return res.status(401).json({ message: "User not found" });
//         }
//         req.user = user;
//         next();
//     }catch (error) {
//         console.log(error);        
//         res.status(401).json({ message: error });
//     }
// }

// module.exports = authMiddleware;







const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.podcasterUserToken; // Make sure this token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // console.log("TOKEN:", token);  // Debugging: Check if token is received

        // console.log("ENV JWT_SECRET:", process.env.SECRET_KEY);
if (!process.env.SECRET_KEY) {
    return res.status(500).json({ message: "JWT Secret Key is missing" });
}


        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("DECODED JWT:", decoded);  // Debugging: Check if decoding works

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
