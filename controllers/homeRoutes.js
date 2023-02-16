const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
//TODO: Get all projects and JOIN with user data.
//TODO: Serialize data so the template can read it. 
//TODO: Pass serialized data and session flag into homepage template.
});

router.get('/project/:id', async (req, res) => {
//TODO: Get individual project and JOIN with user data.
//TODO: Serialize data so the template can read it.
//TODO: Pass serialized data and session flag into project template.
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
//TODO: Find the logged in user based on the session ID
//TODO: Serialize data so the template can read it.
//TODO: Pass serialized data into profile template.
});

router.get('/login', (req, res) => {
//TODO: If the user is already logged in, redirect the request to another route.
});

module.exports = router;
