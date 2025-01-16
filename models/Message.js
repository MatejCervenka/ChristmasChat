const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: String, required: true }, // Can be chat room ID
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);