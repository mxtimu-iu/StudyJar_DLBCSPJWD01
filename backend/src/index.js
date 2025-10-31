require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const dailyProgressRoutes = require('./routes/dailyProgress');
const analyticsRoutes = require('./routes/analytics');

// Connect to MongoDB
connectDB(); 

const app = express();

// --- START: UPDATED CORS CONFIGURATION ---
// This is the URL i will get from Vercel after you deploy your frontend
const VERCEL_CLIENT_URL = "https://study-jar-dlbcspjwd-01-frontend.vercel.app";

const corsOptions = {
    // This array allows both your local machine and your Vercel app to make requests
    origin: [VERCEL_CLIENT_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
// --- END: UPDATED CORS CONFIGURATION ---

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
app.use('/api/daily-progress', dailyProgressRoutes);
app.use('/api/analytics', analyticsRoutes);

// Basic route for testing
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running!' });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//   .json({ message: 'Something went wrong!' });
// });
// Error handling middleware
app.use((err, req, res, next) => {
        console.error(err.stack);
        // This is the corrected line:
        res.status(500).json({ message: 'Something went wrong!' }); 
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});