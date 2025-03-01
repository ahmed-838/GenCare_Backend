const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        length: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;