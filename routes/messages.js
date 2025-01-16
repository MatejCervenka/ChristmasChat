const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// Get all messages from all rooms
router.get('/all', async (req, res) => {
    const messages = await Message.find().populate('userId', 'username');
    res.json(messages);
});

// Get all messages from a specific room
router.get('/room/:roomId', async (req, res) => {
    const messages = await Message.find({ roomId: req.params.roomId }).populate('userId', 'username');
    res.json(messages);
});

// Get all messages from a specific user
router.get('/user/:userId', async (req, res) => {
    const messages = await Message.find({ userId: req.params.userId }).populate('roomId', 'name');
    res.json(messages);
});

// Get all messages containing a specific word
router.get('/search/:word', async (req, res) => {
    const regex = new RegExp(req.params.word, 'i');
    const messages = await Message.find({ content: regex }).populate('userId', 'username');
    res.json(messages);
});

module.exports = router;