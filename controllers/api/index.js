const router = require('express').Router();
const userRoutes = require('./userRoutes');
const publicRoutes = require('./publicRoutes');

router.use('/users', userRoutes);
router.use('/public', publicRoutes);

module.exports = router;
