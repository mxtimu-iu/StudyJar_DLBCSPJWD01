const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    subjects: [{
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        }
    }],
    dailyGoal: {
        type: Number,
        default: 120, // 2 hours in minutes
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Add default subjects if none exist
userSchema.pre('save', function (next) {
    if (this.subjects.length === 0) {
        this.subjects = [
            { name: 'Study', color: '#4F46E5' },
            { name: 'Work', color: '#10B981' },
            { name: 'Reading', color: '#F59E0B' },
            { name: 'Exercise', color: '#EF4444' },
        ];
    }
    next();
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 