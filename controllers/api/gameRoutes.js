const router = require('express').Router();
const { Game } = require('../../models')
const withAuth = require('../../utils/auth');

router.post("/", function (req, res) {
    if (!req.user) {
        res.redirect("/login");
    } else {
        db.Game.create(req.body).then(function (game) {
            res.json(game);
        }).catch(function (err) {
            res.status(401).json(err);
        });
    }
});

router.put('/:id', async (req, res) => {
    const gameData = await Game.update(req.body, {
        where: {
            id: req.params.id
        },
    })
    res.json(gameData)
})