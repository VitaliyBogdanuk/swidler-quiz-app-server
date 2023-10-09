const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user based on their authentication provider and ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authProvider
 *               - authId
 *             properties:
 *               authProvider:
 *                 type: string
 *                 description: The authentication provider (e.g., "google" or "facebook").
 *               authId:
 *                 type: string
 *                 description: The unique ID associated with the user for the given authentication provider.
 *     responses:
 *       200:
 *         description: Returns the authenticated user's data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 authProvider:
 *                   type: string
 *                 authId:
 *                   type: string
 *                 score:
 *                   type: integer
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
