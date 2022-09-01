const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Videogame = require('../models/Videogame');

// Route 1: Get all video games
router.get('/', async (req, res) => {
    try {
        const items = await Videogame.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// Route 2: Add new video game
router.post('/', [
    check('gameId', 'GameId is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { gameId, name, category } = req.body;
    const newVideogame = new Videogame({
        gameId,
        name,
        category
    });
    try {
        await newVideogame.save();
        res.json({ msg: 'Videogame added successfully' });
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// Route 3: Delete video game based on gameId
router.delete('/:gameId', async (req, res) => {
    try {
        const videogame = await Videogame.findOne({ gameId: req.params.gameId });
        if (!videogame) {
            return res.status(404).json({ errors: [{ msg: 'Game not found' }] });
        }

        await videogame.delete();
        res.json({ message: 'Videogame deleted successfully' });

    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// Route 3: Get video game based on gameId
router.get('/:gameId', async (req, res) => {
    try {
        const videogame = await Videogame.findOne({ gameId: req.params.gameId });
        if (!videogame) {
            return res.status(404).json({ errors: [{ msg: 'Game not found' }] });
        }

        res.json(videogame);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// Route 4: Update video game based on gameId
router.put('/:gameId', [
    check('gameId', 'GameId is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { gameId, name, category } = req.body;
    const videogame = {
        gameId,
        name,
        category
    };
    try {
        const updatedVideogame = await Videogame.findOneAndUpdate({ gameId: req.params.gameId }, videogame, { new: true });
        res.json(updatedVideogame);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

module.exports = router;