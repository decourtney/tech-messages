const router = require('express').Router();
const { Post, User, MainPost } = require('../../models');

router.get('/', async (req, res) => {
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

    console.log(posts);
    console.log(posts[0].posts)

    res.status(200).json(mainPostsData)
    // res.render('todaysposts', {
    //   posts,
    //   logged_in: req.session.logged_in
    // });
  } catch (err)
  {
    res.status(500).json(err);
  }
});

module.exports = router;
