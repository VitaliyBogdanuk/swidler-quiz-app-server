const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

router.post('/login', (req, res) => {
    const { authProvider, authId } = req.body;
    const user = users.find(u => u.authProvider === authProvider && u.authId === authId);
    if (user) {
        res.json(user);
    } else {
        // Handle user registration logic here
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
