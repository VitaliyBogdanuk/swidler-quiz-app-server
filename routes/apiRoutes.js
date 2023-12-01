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
const { createFeedback } = require('../controllers/feedbackController');

const { listCheaterPhones,
        createCheaterPhoneUser,
        readCheaterPhone } = require('../controllers/cheaterPhoneController');
const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'public/img')
        },
        filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname))
        }
})
const upload = multer({ storage: storage })
router.post('/feedback', createFeedback);

router.get('/cheaterPhones', listCheaterPhones);
router.post('/cheaterPhone', upload.fields([{ name: 'uploadedFile' }]), createCheaterPhoneUser);
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

router.post('/foxChat', apiController.chat);

router.get('/categories', listCategories);
router.get('/category/:id', readCategory);

router.get('/situations', listSituations);
router.get('/situation/:id', readSituation);

router.get('/topics', listTopics);
router.get('/topic/:id', readTopic);

router.get('/achievements', listAchievements);
router.get('/achievement/:id', readAchievement);

router.get('/users', listUsers);
router.get('/user/:id', readUser);
router.post('/user/updateTopics', updateUserTopics);
router.post('/user/updateScore', updateUserScore);
router.put('/user/countCorrectAnswer/:id', updateUserCorrectAnswer);
router.put('/user/countWrongAnswer/:id', updateUserWrongAnswer);

// TODO add a route for '/reset/:token' to handle the password reset process.

module.exports = router;
