const express = require('express');
const passport = require('passport');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { sessionChecker } = require('../middlewares/apiAuth');
const { listCategories, readCategory } = require('../controllers/categoryController');
const { listAchievements, readAchievement } = require('../controllers/achievementController');
const { listTopics, readTopic } = require('../controllers/topicController');
const { listSituations, readSituation } = require('../controllers/situationController');
const { listUsers, 
        readUser, 
        updateUserTopics, 
        updateUserScore, 
        updateUserCorrectAnswer, 
        updateUserWrongAnswer
    } = require('../controllers/userController');

const { listCheaterPhones, 
        createCheaterPhoneUser, 
        readCheaterPhone } = require('../controllers/сheaterPhoneController');

const { createFeedback } = require('../controllers/feedbackController');

router.post('/feedback', createFeedback);

router.get('/cheaterPhones', listCheaterPhones);
router.post('/cheaterPhone', createCheaterPhoneUser);
router.get('/cheaterPhone/:phone', readCheaterPhone);

router.post('/register', apiController.register);
router.post('/login', apiController.login);
router.post('/forgot-password', apiController.forgotPassword);
router.post('/logout', apiController.logout);

//TODO Google Auth
// Route for redirecting to Google's OAuth service
// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// The callback route after successful Google authentication
// router.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect('https://bro.savvydev.tech');
//     }
// );

router.post('/foxChat', sessionChecker, apiController.chat);

router.get('/categories', sessionChecker, listCategories);
router.get('/category/:id', sessionChecker, readCategory);

router.get('/situations', sessionChecker, listSituations);
router.get('/situation/:id', sessionChecker, readSituation);

router.get('/topics', sessionChecker, listTopics);
router.get('/topic/:id', sessionChecker, readTopic);

router.get('/achievements', sessionChecker, listAchievements);
router.get('/achievement/:id', sessionChecker, readAchievement);

router.get('/users', sessionChecker, listUsers);
router.get('/user/:id', sessionChecker, readUser);
router.post('/user/updateTopics', sessionChecker, updateUserTopics);
router.post('/user/updateScore', sessionChecker, updateUserScore);
router.put('/user/countCorrectAnswer/:id', sessionChecker, updateUserCorrectAnswer);
router.put('/user/countWrongAnswer/:id', sessionChecker, updateUserWrongAnswer);

// TODO add a route for '/reset/:token' to handle the password reset process.

module.exports = router;
