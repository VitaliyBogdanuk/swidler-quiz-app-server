const { User } = require('../models/');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    User.register(new User({ username, email }), password, (err, user) => {
        if (err) {
            req.flash('error', 'Email already exists');
            res.redirect('/auth/register');
        }

        passport.authenticate('local')(req, res, function () {
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/auth/login');
        });
    });
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',

        // successRedirect: '/submit',

        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        req.flash('error', 'No account with that email address exists.');
        return res.redirect('/auth/login');
    }

    // Token for email
    const token = crypto.randomBytes(20).toString('hex');

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // send email
    const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'v.bogdanuk@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        to: email,
        from: 'your-email@gmail.com',
        subject: 'Node.js Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://${req.headers.host}/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    smtpTransport.sendMail(mailOptions, (err) => {
        console.log('mail sent');
        req.flash('success_msg', 'An e-mail has been sent to ' + email + ' with further instructions.');
        res.redirect('/auth/login');
    });
};

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });
};
