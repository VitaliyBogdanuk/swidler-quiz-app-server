// This is a middleware function to check for logged-in users
exports.sessionChecker = (req, res, next) => {
    // if (!req.isAuthenticated()) {
        // res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    // } else {
        return next()
    // }
};