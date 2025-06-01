const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register user
router.post(
    '/register',
    [
        body('username').trim().notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, email, password } = req.body;

            // Check if user exists
            const userExists = await User.findOne({ $or: [{ email }, { username }] });
            if (userExists) {
                return res.status(400).json({
                    message: 'User already exists',
                });
            }

            // Create user
            const user = await User.create({
                username,
                email,
                password,
            });

            // Generate token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.status(201).json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    subjects: user.subjects,
                    dailyGoal: user.dailyGoal,
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Login user
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    subjects: user.subjects,
                    dailyGoal: user.dailyGoal,
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Get user profile
router.get('/me', protect, async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                subjects: req.user.subjects,
                dailyGoal: req.user.dailyGoal,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user settings
router.patch('/settings', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (req.body.subjects) user.subjects = req.body.subjects;
        if (req.body.dailyGoal) user.dailyGoal = req.body.dailyGoal;
        await user.save();

        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                subjects: user.subjects,
                dailyGoal: user.dailyGoal,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 