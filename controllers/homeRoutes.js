const router = require('express').Router();
const { User, Game } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage', {title:router});
  
});

router.get('/Ninja-Party/build/', async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const stats = projectData.get({ plain: true });

    res.render('games', {
      ...stats,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('successfully got data')
  }
});




// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
