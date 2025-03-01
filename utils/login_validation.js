const loginValidation = (req, res, next) => {
    const { phone, password } = req.body;
    if (!phone) {
        return res.status(400).json({ error: 'Phone is required' });
    }
    if (phone.length !== 10) {
        return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    next();
};

module.exports = loginValidation;
