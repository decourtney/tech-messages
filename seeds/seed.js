const sequelize = require('../config/connection');
const { User, Post, MainPost } = require('../models');

const userData = require('./userData.json');
const mainPostTitle = require('./mainPostTitle.json');
const mainPostData = require('./mainPostData.json');
const postData = require('./postData.json');

const seedDatabase = async () =>
{
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let index = 0;
  for (const mainPost of mainPostTitle)
  {
    const userID = users[Math.floor(Math.random() * users.length)].id;

    await MainPost.create({
      ...mainPost,
      user_id: userID
    });

    console.log('console log output' + mainPostData[index])
    await Post.create({
      ...mainPostData[index],
      user_id: userID
    });

    index++;
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
