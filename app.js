const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./controllers/authController');
const messageRoutes = require('./routes/messages');
const chatSocket = require('./sockets/chat');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Database connection
mongoose.connect('mongodb://localhost:27017/chatapp')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/messages', authenticateToken, messageRoutes); // Protected messages routes

// WebSocket handling
chatSocket(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
