const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const userController = require('../controllers/userController');
const achievementController = require('../controllers/achievementController');
const answerController = require('../controllers/answerController');
const categoryController = require('../controllers/categoryController');
const situationController = require('../controllers/situationController');
const topicController = require('../controllers/topicController');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index', { session: req.session });
});

router.get('/auth/login', (req, res) => {
    res.render('auth/sign-in', { messages: false });
});

router.get('/auth/register', (req, res) => {
    res.render('auth/sign-up', { messages: false });
});

router.get('/auth/forgot', (req, res) => {
    res.render('auth/forgot');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('pages/dashboard', { user: req.user });
});

router.get('/tables/users', ensureAuthenticated, async (req, res) => {
    try {
        const usersList = await userController.getUsers();
        res.render('pages/users', { user: req.user, usersList: usersList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

router.get('/tables/achievements', ensureAuthenticated, async (req, res) => {
    try {
        const achievementsList = await achievementController.getAchievements();
        res.render('pages/achievements', { user: req.user, achievementsList: achievementsList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

router.get('/tables/answers', ensureAuthenticated, async (req, res) => {
    try {
        const answersList = await answerController.getAnswers();
        res.render('pages/answers', { user: req.user, answersList: answersList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

router.get('/tables/categories',  async (req, res) => {
    try {
        const categoriesList = await categoryController.getCategories();
        res.render('pages/categories', { user: req.user, categoriesList: categoriesList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

router.get('/tables/situations', ensureAuthenticated, async (req, res) => {
    try {
        const situationsList = await situationController.getSituations();
        res.render('pages/situations', { user: req.user, situationsList: situationsList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/tables/topics', ensureAuthenticated, async (req, res) => {
    try {
        const topicsList = await topicController.getTopics();
        res.render('pages/topics', { user: req.user, topicsList: topicsList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('pages/profile', { user: req.user });
});
router.get('/tables/add_category',  async (req, res) => {
    try {
        //const categoriesList = await categoryController.getCategories();
        res.render('pages/add_category',{user: req.user});
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
module.exports = router;
