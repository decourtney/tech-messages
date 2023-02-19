const sequelize = require('../config/connection');
const { User, Post, MainPost } = require('../models');

const userData = require('./userData.json');
const mainPostData = require('./mainPostData.json');
const postData = require('./postData.json');

const seedDatabase = async () =>
{
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const mainPost of mainPostData)
  {
    await MainPost.create({
      ...mainPost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const post of postData){
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
