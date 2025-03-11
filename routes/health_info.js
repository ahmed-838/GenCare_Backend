const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const HealthInfo = require('../models/HealthInfo');
const { body, validationResult } = require('express-validator');

// Get health info
router.get('/', authMiddleware, async (req, res) => {
    try {
        const healthInfo = await HealthInfo.findOne({ userId: req.userId });
        if (!healthInfo) {
            return res.status(404).json({ error: 'Health info not found' });
        }

        res.status(200).json(healthInfo);
    } catch (error) {
        console.error('Error fetching health info:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create health info
router.post('/', authMiddleware, [
    body('healthInfo.bloodPressure').isArray().withMessage('Blood pressure must be an array'),
    body('healthInfo.bloodSugar').isNumeric().withMessage('Blood sugar must be a number'),
    body('healthInfo.symptoms').isArray().withMessage('Symptoms must be an array'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { healthInfo } = req.body;
        const newHealthInfo = await HealthInfo.create({ userId: req.userId, healthInfo });
        res.status(201).json(newHealthInfo);
    } catch (error) {
        console.error('Error creating health info:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/', authMiddleware, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { healthInfo } = req.body;
        console.log('Updating health info for user:', req.userId, 'with data:', healthInfo); // تحقق من البيانات
        const updatedHealthInfo = await HealthInfo.findOneAndUpdate({ userId: req.userId }, { healthInfo }, { new: true });
        console.log('Updated health info:', updatedHealthInfo); // تحقق من النتيجة
        res.status(200).json(updatedHealthInfo);
    } catch (error) {
        console.error('Error updating health info:', error);
        res.status(500).json({ error: error.message });
    }
}); 
module.exports = router;