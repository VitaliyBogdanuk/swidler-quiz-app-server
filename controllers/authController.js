const { User } = require('../models/');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('error', 'Email already exists');
            return res.redirect('/auth/register');
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password
        });

        // Authenticate the user
        req.login(user, function(err) {
            if (err) {
                console.error(err);
                console.log(user);
                return res.redirect('/auth/register');
            }
            req.flash('success_msg', 'You are now registered and logged in');
            res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.redirect('/auth/register');
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
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
            user: 'your-email',
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
