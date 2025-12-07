const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // La chaîne de connexion doit être dans le fichier .env
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log('Connexion à MongoDB réussie!');
    } catch (err) {
        console.error(`Erreur de connexion à MongoDB: ${err.message}`);
        process.exit(1); // Quitter le processus avec un code d'erreur [cite: 3437]
    }
};

module.exports = connectDB;