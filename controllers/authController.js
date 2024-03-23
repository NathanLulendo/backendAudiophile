const User = require('../model/user');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.json({ error: "Please enter all fields" });
        }

        if (password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.json({ error: "An account with this email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({ name: name, email: email, password: hashedPassword});

        return res.status(201).json({ message: 'Account create successfully' });

    } catch (error) {
        console.log(error);
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.json({ error: "Please enter all fields" });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.json({ error: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);

        if(isMatch) {
            jwt.sign({email: user.email, id: user._id, name: user.name, roles:user.roles}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) {
                    throw err;
                }
                else {
                    res.cookie('token', token).json(user);
                    console.log(user);
                }
            });
        }


    } catch (error) {
        console.log(error);
    }
}


const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, {},  (err, user) => {
            if(err) {
                throw err;
            }
            res.json(user);
        });
    }
    else{
        res.json(null);
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token').json({ message: "Logged out successfully" });
}






module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}