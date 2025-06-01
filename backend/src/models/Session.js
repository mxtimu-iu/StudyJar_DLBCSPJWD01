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
        required: true,
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
    gemType: {
        type: String,
        enum: ['pebble', 'gem', 'crystal'],
        required: true,
    },
    completed: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Calculate gem type based on duration
sessionSchema.pre('save', function (next) {
    if (this.duration >= 60) {
        this.gemType = 'crystal';
    } else if (this.duration >= 30) {
        this.gemType = 'gem';
    } else {
        this.gemType = 'pebble';
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

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session; 