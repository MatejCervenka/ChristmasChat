const { checkProfanity } = require('../utils/profanityFilter');
const Message = require('../models/Message');
const ChatRoom = require('../models/ChatRoom');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        socket.on('joinRoom', ({ roomId, username }) => {
            socket.join(roomId);
            io.to(roomId).emit('notification', `${username} joined the room`);
        });

        socket.on('message', async ({ roomId, message, user }) => {
            const isProfane = await checkProfanity(message);

            if (isProfane) {
                io.to(roomId).emit('notification', `Profanity detected in your message, ${user.username}`);
                // Optionally, ban the user or log the action here
            } else {
                const newMessage = new Message({
                    content: message,
                    userId: user._id,
                    roomId,
                });

                await newMessage.save();
                io.to(roomId).emit('message', { user, message });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
};
