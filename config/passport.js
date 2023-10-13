const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models'); // Adjust the path accordingly
const User = models.User;
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Find the user by email
            const user = await User.findOne({ where: { email: email } });

            // If not, return
            if (!user) {
                return done(null, false, { message: 'That email is not registered' });
            }

            // Match password
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};