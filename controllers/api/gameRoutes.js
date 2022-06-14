const router = require('express').Router();
const { Game } = require('../../models')
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const gameData = await Game.create(req.body)
        res.json(gameData)
        

    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const gameData = await Game.update(req.body, {
        where: {
            id: req.params.id
        },
    })
    res.json(gameData)
})