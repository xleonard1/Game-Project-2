const router = require('express').Router();
const { Game, User } = require('../../models');

const withAuth = require('../../utils/auth');


router.get('/',  async (req, res) => {
  try {
    const gameData = await Game.findAll( {
      include: [{
        model: User,
        key: 'id'
      }]
    });
    res.status(200).json(gameData);
  } catch (err) {
    res.status(400).json(err);
  }
});








module.exports = router

