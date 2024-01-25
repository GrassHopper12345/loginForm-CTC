const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home_routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => res.send('Wrong Route!'));

module.exports = router;
