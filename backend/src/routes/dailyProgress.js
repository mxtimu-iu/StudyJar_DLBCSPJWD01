const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const DailyProgress = require('../models/DailyProgress');
const User = require('../models/User');

// Get today's progress
router.get('/today', protect, async (req, res) => {
    console.log('Received request for daily progress');
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log('User ID:', req.user.id);

        let progress = await DailyProgress.findOne({
            user: req.user.id,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        }).populate('sessions');

        console.log('Found progress:', progress);

        if (!progress) {
            console.log('Creating new progress entry');
            progress = await DailyProgress.create({
                user: req.user.id,
                date: today
            });
        }

        const streak = await DailyProgress.getCurrentStreak(req.user.id);
        const user = await User.findById(req.user.id);

        console.log('Sending response:', {
            progress,
            dailyGoal: user.dailyGoal,
            streak
        });

        res.json({
            progress,
            dailyGoal: user.dailyGoal,
            streak
        });
    } catch (error) {
        console.error('Error in daily progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update daily goal
router.put('/goal', protect, async (req, res) => {
    try {
        const { dailyGoal } = req.body;

        if (!dailyGoal || dailyGoal < 1) {
            return res.status(400).json({ message: 'Invalid daily goal' });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { dailyGoal },
            { new: true }
        );

        res.json({ dailyGoal: user.dailyGoal });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get progress history
router.get('/history', protect, async (req, res) => {
    try {
        const { days = 7 } = req.query;
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));

        const progress = await DailyProgress.find({
            user: req.user.id,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 