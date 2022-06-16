const router = require('express').Router();
const { Game } = require('../../models');

const withAuth = require('../../utils/auth');


router.get('/Ninja-Party/build', async (req, res) => {
  try {
    console.log('hell nah')
    const newGame = await Game.findAll({
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(newGame)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const gameData = await Game.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });
    if (!gameData) {
      res.status(404).json({ message: 'no game data found with this id!' })
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err)
  }
});



module.exports = router;

