const { User } = require('../models');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.login = (req, res, next) => {
    passport.authenticate('local', {session: true}, (err, user, info) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: info.message });

        req.logIn(user, err => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        // Send the user information back to the frontend
        return res.status(201).json({ message: 'User created successfully', user });
      
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'No account with that email address exists.' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'v.bogdanuk@gmail.com',
                pass: 'your-password' // make sure to use environment variable in production
            }
        });

        const mailOptions = {
            to: email,
            from: 'your-email@gmail.com',
            subject: 'Node.js Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://${req.headers.host}/api/reset/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        smtpTransport.sendMail(mailOptions, (err) => {
            if (err) return res.status(500).json({ error: 'Error sending email' });
            return res.status(200).json({ message: 'An e-mail has been sent to ' + email + ' with further instructions.' });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully' });
};
