const mongoose = require('mongoose');

const performanceStatSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        required: [true, 'Le joueur est obligatoire pour la statistique.'],
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: [true,'Le match est obligatoire pour la statistique.']
    },
    matchDate: {
        type: Date,
        required: [true, 'La date du match est obligatoire.'],
        default: Date.now,
    },
    goals: {
        type: Number,
        default: 0,
        min: [0, 'Les buts ne peuvent pas être négatifs.'],
    },
    assists: {
        type: Number,
        default: 0,
        min: [0, 'Les passes décisives ne peuvent pas être négatives.'],
    },
    minutesPlayed: {
        type: Number,
        required: [true, 'Les minutes jouées sont obligatoires.'],
        min: [0, 'Les minutes ne peuvent pas être négatives.'],
        max: [120, 'Les minutes jouées ne peuvent excéder 120 minutes (temps additionnel).'],
    },
    rating: {
        type: Number,
        required: [true, 'La note du match est obligatoire.'],
        min: [1, 'La note minimale est 1.'],
        max: [10, 'La note maximale est 10.'],
    },
}, {
    timestamps: true 
});

performanceStatSchema.index({ player: 1, match: 1}, { unique: true});

module.exports = mongoose.model('PerformanceStat', performanceStatSchema);