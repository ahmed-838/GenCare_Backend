const express = require('express');
const router = express.Router();
const User = require('../models/User');
const signupValidation = require('../utils/signup_validation');


router.post('/', signupValidation, async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        const user = await User.findOne({ phone, email });
        if (user) {
            return res.status(400).json({ error: 'User already exists use another phone or email' });
        }

        const newUser = new User({ name, phone, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', (req, res) => {
    res.send('Hello From the Signup Route');
});

module.exports = router;