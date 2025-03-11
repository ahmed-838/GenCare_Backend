const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const PersonalInfo = require('../models/PersonalInfo');

// Get user data
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user, role: req.role });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get personal info
router.get('/', authMiddleware, async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne({ userId: req.userId }).populate('userId');
        if (!personalInfo) {
            return res.status(404).json({ error: 'User personal info data not found' });
        }
        res.status(200).json(personalInfo);
    } catch (error) {
        console.error('Error fetching user personal info data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create personal info
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { personalInfo } = req.body;
        if (!personalInfo || !personalInfo.fullName || !personalInfo.phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const userMetaData = await PersonalInfo.create({ userId: req.userId, personalInfo });
        res.status(201).json(userMetaData);
    } catch (error) {
        console.error('Error creating user personal info data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update personal info
router.put('/', authMiddleware, async (req, res) => {
    try {
        const { personalInfo } = req.body;
        if (!personalInfo || !personalInfo.fullName || !personalInfo.phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // البحث عن الـ PersonalInfo باستخدام الـ userId
        const userMetaData = await PersonalInfo.findOneAndUpdate(
            { userId: req.userId }, // البحث باستخدام الـ userId
            { personalInfo }, // البيانات الجديدة
            { new: true } // إرجاع البيانات المحدثة
        );

        if (!userMetaData) {
            return res.status(404).json({ error: 'User personal info data not found' });
        }

        res.status(200).json(userMetaData);
    } catch (error) {
        console.error('Error updating user personal info data:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;