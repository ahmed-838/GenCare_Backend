const mongoose = require('mongoose');

const healthInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    healthInfo: {
        type: Object,
        required: true,
        bloodPressure: {
            type: [Number, Number],
        },
        bloodSugar: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        symptoms: {
            type: [String],
        },
    }
});

const HealthInfo = mongoose.model('HealthInfo', healthInfoSchema, 'health_info');

module.exports = HealthInfo;