const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Bibliothèque pour le hachage

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est obligatoire.'],
        unique: true, // Doit être unique dans la collection
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire.'],
        unique: true, // Doit être unique [cite: 4202]
        trim: true,
        lowercase: true,
        // Validation basique du format d'email
        match: [/^\S+@\S+\.\S+$/, 'Veuillez utiliser un format d\'email valide.'],
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire.'],
        minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.'], // minlength de 6 pour la démo
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, {
    timestamps: true
});

// --- MIDDLEWARE DE PRE-SAVE (HASHAGE) ---
// Cette fonction s'exécute avant que le document ne soit sauvegardé.
userSchema.pre('save', async function () {
    // Ne hacher le mot de passe que s'il a été modifié ou s'il est nouveau.
    if (!this.isModified('password')) return;
    // Générer le sel (salt)
    const salt = await bcrypt.genSalt(10);
    // Hacher le mot de passe avec le sel
    this.password = await bcrypt.hash(this.password, salt);
    
});

// --- MÉTHODE DE COMPARAISON DES MOTS DE PASSE ---
// Méthode pour comparer le mot de passe soumis avec le hash stocké
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);