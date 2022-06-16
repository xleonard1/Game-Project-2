const sequelize = require('../config/connection');
const { User, Game, Update} = require('../models');

const userData = require('./userData.json');
const userStats = require('./Userstats.json')



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Game.bulkCreate(userStats, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};


seedDatabase();
