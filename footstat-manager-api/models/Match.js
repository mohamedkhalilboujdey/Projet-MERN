
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du match est obligatoire.'],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, 'La date du match est obligatoire.'],
        index: true, 
    },
    opponent: {
        type: String,
        required: [true, 'L\'adversaire est obligatoire.'],
        trim: true,
    },
    score: {
        type: String, 
        trim: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);