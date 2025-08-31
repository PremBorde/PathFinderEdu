const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (process.env.NODE_ENV === 'production') {
            return callback(null, process.env.FRONTEND_URL);
        }
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pathfinder_edu_dev')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Import and use route handlers
const usersRouter = require('./routes/usersRouter');
const productRouter = require('./routes/productRouter');
const ownerRouter = require('./routes/ownerRouter');

app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/owners', ownerRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;