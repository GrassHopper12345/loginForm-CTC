const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth'); 


router.get('/profile', withAuth, async (req, res) => {
    try {
        
        const userData = await User.findByPk(req.user.user_id, {
            attributes: { exclude: ['password'] },
            
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
