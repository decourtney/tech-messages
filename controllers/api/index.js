const router = require('express').Router();
const userRoutes = require('./userRoutes');
const forumRoutes = require('./forumRoutes');

router.use('/users', userRoutes);
router.use('/forum', forumRoutes);

module.exports = router;
