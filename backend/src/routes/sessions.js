const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const { protect } = require('../middleware/auth');

// Start a new session
router.post('/start', protect, async (req, res) => {
    try {
        const { subject } = req.body;
        console.log('Request body:', req.body);
        console.log('User:', req.user);

        const session = await Session.create({
            user: req.user._id,
            subject,
            startTime: new Date(),
        });

        res.status(201).json(session);
    } catch (error) {
        console.error('Session creation error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// End a session
router.post('/end/:id', protect, async (req, res) => {
    try {
        const session = await Session.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const endTime = new Date();
        const duration = Math.floor(
            (endTime.getTime() - session.startTime.getTime()) / (1000 * 60)
        ); // Convert to minutes

        session.endTime = endTime;
        session.duration = duration;
        session.completed = true;
        await session.save();

        res.json(session);
    } catch (error) {
        console.error('Session end error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get today's sessions
router.get('/today', protect, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const sessions = await Session.find({
            user: req.user._id,
            startTime: { $gte: today, $lt: tomorrow },
            completed: true,
        }).sort('-startTime');

        res.json(sessions);
    } catch (error) {
        console.error('Get today\'s sessions error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get sessions by date range
router.get('/range', protect, async (req, res) => {
    try {
        const { start, end } = req.query;
        const startDate = new Date(start);
        const endDate = new Date(end);

        const sessions = await Session.find({
            user: req.user._id,
            startTime: { $gte: startDate, $lte: endDate },
            completed: true,
        }).sort('-startTime');

        res.json(sessions);
    } catch (error) {
        console.error('Get sessions by range error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 