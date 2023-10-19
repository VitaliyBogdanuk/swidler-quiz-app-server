const express = require('express');
const router = express.Router();
const { listUsers, createUser, readUser, updateUser, deleteUser, updateUserTopics, updateUserScore, updateUserCorrectAnswer, updateUserWrongAnswer} = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/users', ensureAuthenticated, listUsers);
router.post('/user', ensureAuthenticated, createUser);
router.get('/user/:id', ensureAuthenticated, readUser);
router.put('/user/:id', ensureAuthenticated, updateUser);
router.delete('/user/:id', ensureAuthenticated, deleteUser);
router.post('/updateUserTopics', ensureAuthenticated, updateUserTopics);
router.post('/updateUserScore', ensureAuthenticated, updateUserScore);
router.put('/updateUserCorrectAnswer/:id', ensureAuthenticated, updateUserCorrectAnswer);
router.put('/updateUserWrongAnswer/:id', ensureAuthenticated, updateUserWrongAnswer);
module.exports = router;
