const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post('/signup', async (req, res) => {
    try {
        console.log(123);
        const newUserData = new User();
        newUserData.username = req.body.username;
        newUserData.email = req.body.email;
        newUserData.password = req.body.password;

        const userData = await newUserData.save();
        console.log(userData);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json(err);
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json(err);
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'You are now logged in' });
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;