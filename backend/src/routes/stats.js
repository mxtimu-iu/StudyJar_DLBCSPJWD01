const express = require('express');
const auth = require('../middleware/auth');
const Session = require('../models/Session');

const router = express.Router();

// Get daily stats
router.get('/daily', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const stats = await Session.getStats(req.user._id, today, tomorrow);
        res.json(stats[0] || {
            _id: today.toISOString().split('T')[0],
            totalDuration: 0,
            sessions: 0,
            gems: []
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get weekly stats
router.get('/weekly', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        const stats = await Session.getStats(req.user._id, weekAgo, today);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get monthly stats
router.get('/monthly', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        const stats = await Session.getStats(req.user._id, monthAgo, today);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get stats by date range
router.get('/range', auth, async (req, res) => {
    try {
        const { start, end } = req.query;
        const startDate = new Date(start);
        const endDate = new Date(end);

        const stats = await Session.getStats(req.user._id, startDate, endDate);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get subject-wise stats
router.get('/subjects', auth, async (req, res) => {
    try {
        const { start, end } = req.query;
        const startDate = new Date(start || new Date().setDate(new Date().getDate() - 30));
        const endDate = new Date(end || new Date());

        const stats = await Session.aggregate([
            {
                $match: {
                    user: req.user._id,
                    startTime: { $gte: startDate, $lte: endDate },
                    completed: true,
                },
            },
            {
                $group: {
                    _id: '$subject.name',
                    totalDuration: { $sum: '$duration' },
                    sessions: { $sum: 1 },
                    gems: {
                        $push: {
                            type: '$gemType',
                            duration: '$duration',
                        },
                    },
                },
            },
        ]);

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 