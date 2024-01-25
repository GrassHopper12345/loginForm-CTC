const router = require('express').Router();
const userRoute = require('./user_routes');

router.use('/users', userRoute);

module.exports = router;