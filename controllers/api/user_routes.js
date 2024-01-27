const router = require('express').Router();
const { User } = require('../../models');
const { createSecretToken, verifyToken } = require('../../utils/jwt');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUserData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };

        const userData = await User.create(newUserData);

        const token = createSecretToken(userData.id);
        res.cookie('authToken', token);

        res.status(201).json({ user: userData, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData || !(await userData.checkPassword(req.body.password))) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = createSecretToken(userData.id);
        res.cookie('authToken', token);

        res.status(200).json({ user: userData, message: 'Login successful' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie('authToken');
    res.status(204).end();
});

module.exports = router;
