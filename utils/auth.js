const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        console.log('not logged in');
        res.redirect("/login");
    } else {
        console.log('logged in');
        next();
    }
};

module.exports = withAuth;