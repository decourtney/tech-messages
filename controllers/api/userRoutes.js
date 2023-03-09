const router = require('express').Router();
const { User, Post, MainPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne(
      {
        where: { email: req.body.email }
      });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/post/:id', withAuth, async (req, res) => {
  try {
    const postid = req.params.id
    console.log(req.params)
    const postToDelete = await Post.findByPk(postid);

    if (!postToDelete) {
      res.status(500).json('Could not find the post');
    }

    await postToDelete.destroy();

    res.status(200).json('Post deleted')
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/main-post/:id', withAuth, async (req, res) => {
  try {
    const postid = req.params.id
    console.log(req.params)
    const mainPostToDelete = await MainPost.findByPk(postid);

    if (!mainPostToDelete) {
      res.status(500).json('Could not find the post');
    }

    await mainPostToDelete.destroy();

    res.status(200).json('Post deleted')
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/create-post', withAuth, async (req, res) => {
  try {
    const {postID, replyText} = req.body
    console.log(req.body);
    // const newPost = await Post.create()
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
