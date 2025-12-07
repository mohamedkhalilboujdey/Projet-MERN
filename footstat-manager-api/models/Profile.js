// models/Profile.js

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    // CLÉ DE LA RELATION 1-TO-1
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [500, 'La bio ne peut pas dépasser 500 caractères.']
    },
    avatarURL: {
        type: String,
        default: 'https://default-avatar.com/image.png'
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);