const router = require('express').Router();
const { Play } = require('../../public/Ninja-Party/src/scenes/Play');
const withAuth = require('../../utils/auth');

router.get('/game/',  async (req, res) => {
  try {
    const Game = await Play.findAll({
      include: []
    });

    res.status(200).json(newGame);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
