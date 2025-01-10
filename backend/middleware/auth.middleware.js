const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.podcasterUserToken;
        if( token ) {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({ _id: decode.id });
        }

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }catch (error) {
        console.log(error);        
        res.status(401).json({ message: error });
    }
}

module.exports = authMiddleware;