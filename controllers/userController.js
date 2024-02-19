const user = require('../model/user');
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newUser = new user({
        name,
        email,
        password: hashedPassword
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await user.find();
        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get a user by id
const getUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await user.findById(id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a user
const updateUser = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedUser = await user.findByIdAndUpdate(id, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        await user.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};