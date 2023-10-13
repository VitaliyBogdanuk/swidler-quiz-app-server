const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.get('/logout', logout);

module.exports = router;
