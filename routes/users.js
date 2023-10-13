const express = require('express');
const router = express.Router();
const { listUsers, createUser, readUser, updateUser, deleteUser } = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/users', ensureAuthenticated, listUsers);
router.post('/user', ensureAuthenticated, createUser);
router.get('/user/:id', ensureAuthenticated, readUser);
router.put('/user/:id', ensureAuthenticated, updateUser);
router.delete('/user/:id', ensureAuthenticated, deleteUser);

module.exports = router;
