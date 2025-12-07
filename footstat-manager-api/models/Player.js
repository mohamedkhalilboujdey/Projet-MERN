const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du joueur est obligatoire.'],
        trim: true, 
        minlength: [3, 'Le nom doit contenir au moins 3 caractères.']
    },
    position: {
        type: String,
        required: [true, 'Le poste est obligatoire.'],
        enum: {
            values: ['Attaquant', 'Milieu', 'Défenseur', 'Gardien'],
            message: '{VALUE} n\'est pas un poste valide.' 
        }
    },
    
    team: {
        type: String,
        default: 'Non assigné' 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
    
}, {
    timestamps: true 
});

module.exports = mongoose.model('Player', playerSchema); 