const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please check the required fields" });
    }

    try {
        // check if email already exists
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "Email already exists" });
        }
        // Hash the password before creating the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new User
        const newUser = await User.create({
            name, 
            email, 
            password: hashedPassword,
        });
        if (newUser) {
            res.status(200).json({
                __id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid user data" });
    }
    
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please check the required fields" });
    }
    try {
        const user = await User.findOne({ email });
        if(user) {
            const doesPasswordMatch = await bcrypt.compare(password, user.password);
            if(doesPasswordMatch) {
                res.status(200).json({
                    __id: user.id,
                    name: user.name,
                    email: user.email,
                })
            } else {
                res.status(400).json({ message: "Password doesn't match" });
            }
        } else {
            res.status(400).json({ message: "Email doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ message: "Please check required fields" });
    }
};

module.exports = {
    registerUser,
    loginUser,
};