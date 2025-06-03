const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: false,
    },
    duration: {
        type: Number, // Duration in minutes
        required: false,
        default: 0,
    },
    gemType: {
        type: String,
        enum: ['pebble', 'gem', 'crystal'],
        required: true,
        default: 'pebble',
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Calculate gem type based on duration
sessionSchema.pre('save', function (next) {
    if (this.completed) {
        if (this.duration >= 60) {
            this.gemType = 'crystal';
        } else if (this.duration >= 30) {
            this.gemType = 'gem';
        } else {
            this.gemType = 'pebble';
        }
    }
    next();
});

// Method to get session stats
sessionSchema.statics.getStats = async function (userId, startDate, endDate) {
    return this.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                startTime: { $gte: startDate, $lte: endDate },
                completed: true,
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
                totalDuration: { $sum: '$duration' },
                sessions: { $sum: 1 },
                gems: {
                    $push: {
                        type: '$gemType',
                        duration: '$duration',
                        subject: '$subject',
                    },
                },
            },
        },
        { $sort: { _id: 1 } },
    ]);
};

// Update daily progress when session is completed
sessionSchema.post('save', async function () {
    if (this.completed) {
        const DailyProgress = mongoose.model('DailyProgress');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let progress = await DailyProgress.findOne({
            user: this.user,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (!progress) {
            progress = await DailyProgress.create({
                user: this.user,
                date: today
            });
        }

        progress.sessions.addToSet(this._id);
        await progress.updateProgress(this.duration);
    }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session; 