const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');

module.exports = (passport) => {

    // Local Strategy for email/password
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } });

                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    // Google OAuth Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID, // your Google client ID
                clientSecret: process.env.GOOGLE_CLIENT_SECRET, // your Google client secret
                callbackURL: 'https://bro-api.savvydev.tech/api/auth/google/callback', // your callback route
                scope: ['profile', 'email'] // this is necessary to retrieve the email from Google
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Extracting the email from the profile object
                    const email = profile.emails[0].value; // Google sends emails as an array, we're interested in the first one
    
                    // Check if the user exists in the database
                    let user = await User.findOne({ where: { email } });
    
                    if (user) {
                        return done(null, user);
                    } else {
                        // If not, create a new record
                        user = await User.create({
                            email,
                            authProvider: 'google',
                            googleId: profile.id, // storing Google's user ID
                            // other data like name can be saved here
                            name: profile.displayName, // if you want to store the user's name
                            // you can also split the profile name into first and last names if your DB design requires this
                        });
    
                        return done(null, user);
                    }
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );

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
