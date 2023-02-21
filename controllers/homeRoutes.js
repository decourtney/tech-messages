const router = require('express').Router();
const sequelize = require('../config/connection');
const { MainPost, User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) =>
{
  try
  {



    const pageTitle = 'Homepage';
    res.render('homepage', {
      pageTitle,
      logged_in: req.session.logged_in
    });
  } catch (err)
  {
    res.status(500).json(err);
  }
});

router.get('/todaysposts', async (req, res) =>
{
  try
  {
    const mainPostsData = await MainPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Post,
          attributes: [
            'date_created',
            'content',
            'is_mainpost',
          ],
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    });

    const posts = mainPostsData.map((mainPost) => mainPost.get({ plain: true }));
    const pageTitle = 'Todays Posts';

    // console.log(posts);
    // console.log(posts[0].posts);
    // console.log(pageTitle);

    res.render('homepage', {
      pageTitle,
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err)
  {
    res.status(500).json(err);
  }
});

router.get('/myposts', withAuth, async (req, res) =>
{
  try
  {
    const myPostsData = await Post.findAll({
      include: [
        {
          model: User,
          where: { id: req.session.user_id },
          attributes: ['name'],
        },
        {
          model: MainPost,
          attributes: ['title'],
          include: [
            {
              model: User,
              attributes: ['name']
            },
            {
              model: Post,
              attributes: ['content','is_mainpost', 'date_created']             
            }
          ]
        }
      ]
    });

    const posts = myPostsData.map((post) => post.get({ plain: true }));
    const pageTitle = 'My Posts';

    console.log(posts);
    console.log(posts[1].mainpost)

    res.render('homepage', {
      pageTitle,
      posts,
      logged_in: true
    });
  } catch (err)
  {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) =>
{
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in)
  {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
