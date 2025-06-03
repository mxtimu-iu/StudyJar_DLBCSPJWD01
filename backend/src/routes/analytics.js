const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Session = require('../models/Session');
const DailyProgress = require('../models/DailyProgress');

// Get study patterns (weekly/monthly)
router.get('/patterns', protect, async (req, res) => {
    try {
        const { timeframe = 'week' } = req.query;
        const endDate = new Date();
        const startDate = new Date();

        // Set date range based on timeframe
        if (timeframe === 'week') {
            startDate.setDate(endDate.getDate() - 7);
        } else if (timeframe === 'month') {
            startDate.setMonth(endDate.getMonth() - 1);
        }

        const sessions = await Session.aggregate([
            {
                $match: {
                    user: req.user._id,
                    startTime: { $gte: startDate, $lte: endDate },
                    completed: true
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
                        subject: '$subject.name'
                    },
                    totalDuration: { $sum: '$duration' },
                    sessions: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.date',
                    subjects: {
                        $push: {
                            name: '$_id.subject',
                            duration: '$totalDuration',
                            sessions: '$sessions'
                        }
                    },
                    totalDuration: { $sum: '$totalDuration' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Get subject-wise totals
        const subjectTotals = await Session.aggregate([
            {
                $match: {
                    user: req.user._id,
                    startTime: { $gte: startDate, $lte: endDate },
                    completed: true
                }
            },
            {
                $group: {
                    _id: '$subject.name',
                    totalDuration: { $sum: '$duration' },
                    sessions: { $sum: 1 },
                    color: { $first: '$subject.color' }
                }
            },
            { $sort: { totalDuration: -1 } }
        ]);

        // Get achievement stats
        const achievements = {
            totalStudyTime: await Session.aggregate([
                {
                    $match: {
                        user: req.user._id,
                        completed: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$duration' }
                    }
                }
            ]).then(result => (result[0]?.total || 0)),

            longestStreak: await DailyProgress.aggregate([
                {
                    $match: {
                        user: req.user._id,
                        goalAchieved: true
                    }
                },
                {
                    $group: {
                        _id: null,
                        dates: { $push: '$date' }
                    }
                }
            ]).then(result => {
                if (!result[0]?.dates) return 0;
                const dates = result[0].dates.sort();
                let maxStreak = 0;
                let currentStreak = 1;

                for (let i = 1; i < dates.length; i++) {
                    const diff = Math.floor((dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24));
                    if (diff === 1) {
                        currentStreak++;
                        maxStreak = Math.max(maxStreak, currentStreak);
                    } else {
                        currentStreak = 1;
                    }
                }
                return Math.max(maxStreak, currentStreak);
            }),

            gemCounts: await Session.aggregate([
                {
                    $match: {
                        user: req.user._id,
                        completed: true
                    }
                },
                {
                    $group: {
                        _id: '$gemType',
                        count: { $sum: 1 }
                    }
                }
            ])
        };

        res.json({
            patterns: sessions,
            subjectTotals,
            achievements
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Error fetching analytics' });
    }
});

module.exports = router; 