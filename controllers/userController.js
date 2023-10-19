const { User } = require('../models');

// List all users
exports.getUsers = async () => {
    try {
        return await User.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

// Controller to send a JSON response
exports.listUsers = async (req, res) => {
    try {
        const users = await exports.getUsers();
        if (users) {
            res.json(users);
        } else {
            res.status(404).json({ message: 'Userss not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read a user
exports.getUser = async () => {
    try {
        return await User.findByPk(req.params.id);
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readUser = async (req, res) => {    
    try {
        const user = await exports.getUser();
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        req.flash('success_msg', `User ${user.name} successfully removed!`);
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
