const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const privateRoute = async (req, res, next) => {
    let authToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            authToken = req.headers.authorization.split(" ")[1];

            // Verify the JWT token
            const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

            // Get the user data from token
            req.user = await User.findById(decodedToken.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorised" });
        }
    }
    if (!authToken) {
        res.status(401).json({ message: "Please add token" });
    }
};

module.exports = {
    privateRoute,
}