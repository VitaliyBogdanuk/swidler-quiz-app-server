const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const userController = require('../controllers/userController');
const achievementController = require('../controllers/achievementController');
const answerController = require('../controllers/answerController');
const categoryController = require('../controllers/categoryController');
const situationController = require('../controllers/situationController');
const topicController = require('../controllers/topicController');
const cheaterPhoneController = require('../controllers/cheaterPhoneController');
const feedbackController = require('../controllers/feedbackController');

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

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const usersList = await userController.getUsers();
    res.render('pages/users', { user: req.user, usersList: usersList });
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

router.get('/tables/categories', ensureAuthenticated, async (req, res) => {
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

router.get('/tables/cheaterPhones', ensureAuthenticated, async (req, res) => {
    try {
        const cheaterPhonesList = await cheaterPhoneController.getCheaterPhones();
        res.render('pages/cheaterPhones', { user: req.user, cheaterPhonesList: cheaterPhonesList });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

router.get('/tables/feedbacks', ensureAuthenticated, async (req, res) => {
    try {
        const feedbacksList = await feedbackController.getFeedbacks();
        res.render('pages/feedbacks', { user: req.user, feedbacksList: feedbacksList });
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

router.get('/forms/category', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const categoryData = await categoryController.getCategory(req);
        res.render('pages/form_category', { user: req.user, updateData: categoryData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/forms/achievement', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const achievementData = await achievementController.getAchievement(req);
        res.render('pages/form_achievements', { user: req.user, updateData: achievementData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/forms/topic', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const topicData = await topicController.getTopic(req);
        const categoriesList = await categoryController.getCategories();
        res.render('pages/form_topics', { user: req.user, categoriesList: categoriesList, updateData:topicData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/forms/situation', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const situationData = await situationController.getSituation(req);
        const answersList = await answerController.getAnswers();
        const topicsList = await topicController.getTopics();
        res.render('pages/form_situations', { user: req.user, answersList: answersList, topicsList: topicsList, updateData: situationData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/forms/user', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const userData = await userController.getUser(req);
        res.render('pages/form_users', { user: req.user, updateData: userData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/forms/answer', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const answerData = await answerController.getAnswer(req);
        const situationsList = await situationController.getSituations();
        res.render('pages/form_answers', { user: req.user, situationsList: situationsList, updateData: answerData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});
router.get('/forms/cheaterPhone', ensureAuthenticated, async (req, res) => {
    try {
        req.params = req.query;
        const cheaterPhoneData = await cheaterPhoneController.getCheaterPhoneAdmin(req);
        res.render('pages/form_cheaterPhone', { user: req.user, updateData: cheaterPhoneData || req.query });
    } catch (error) {
        // handle error
        console.log(error);
        req.flash('error', error);
        res.redirect('back');
    }
});

module.exports = router;
