require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to The Gem Jar API!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Basic route for testing
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
}); 