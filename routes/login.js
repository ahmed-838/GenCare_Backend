const express = require('express');
const router = express.Router();
const loginValidation = require('../utils/login_validation');
const User = require('../models/User');


router.post('/', loginValidation, async (req, res) => {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
        return res.status(400).json({ error: 'Invalid phone or password' });
    }
    if (user.password !== password) {
        return res.status(400).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful' });
});

module.exports = router;