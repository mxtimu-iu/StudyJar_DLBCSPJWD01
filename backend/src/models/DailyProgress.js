const mongoose = require('mongoose');

const dailyProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    totalMinutes: {
        type: Number,
        default: 0,
    },
    goalAchieved: {
        type: Boolean,
        default: false,
    },
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
    }],
}, {
    timestamps: true,
});

// Index for efficient queries
dailyProgressSchema.index({ user: 1, date: 1 }, { unique: true });

// Method to update progress
dailyProgressSchema.methods.updateProgress = async function (sessionDuration) {
    this.totalMinutes += sessionDuration;
    const user = await mongoose.model('User').findById(this.user);
    this.goalAchieved = this.totalMinutes >= user.dailyGoal;
    await this.save();
};

// Static method to get current streak
dailyProgressSchema.statics.getCurrentStreak = async function (userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const progress = await this.find({
        user: userId,
        goalAchieved: true,
        date: { $lte: today }
    }).sort({ date: -1 });

    let streak = 0;
    let currentDate = today;

    for (const day of progress) {
        const progressDate = new Date(day.date);
        progressDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((currentDate - progressDate) / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            streak++;
            currentDate = progressDate;
        } else {
            break;
        }
    }

    return streak;
};

const DailyProgress = mongoose.model('DailyProgress', dailyProgressSchema);

module.exports = DailyProgress; 