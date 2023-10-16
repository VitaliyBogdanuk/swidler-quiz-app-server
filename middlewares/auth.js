exports.ensureAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV == 'development') {
        return next();
    } else {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Please log in to view this resource');
        res.redirect('/auth/login');
    }
};
