require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// --- NOUVEAU: Importations pour l'architecture et la robustesse ---
const playerRoutes = require('./routes/playerRoutes'); // Importation du routeur joueur

const { notFound, errorHandler } = require('./moddleware/errorMiddleware'); // Importation des gestionnaires d'erreurs
// --- NOUVEAU: Importation du routeur stat ---

const statRoutes = require('./routes/statRoutes'); // Importation du nouveau routeur
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
const matchRoutes = require('./routes/matchRoutes');
const cors = require('cors');
// Connexion à la base de données
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middlewares globaux
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.status(200).send('<h1>API FootStat Manager en cours d\'exécution</h1>');
});

// --- DÉLÉGATION des Routes aux Routeurs ---
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes); // Toutes les requêtes /api/players... iront dans playerRoutes [cite: 4066]
app.use('/api/stats', statRoutes); // Nouveau routeur pour les statistiques
app.use('/api/profiles', profileRoutes);
app.use('/api/matches', matchRoutes);


// --- Middlewares de Gestion d'Erreurs (Doivent être placés après toutes les routes) ---
app.use(notFound); // Gère le cas où aucune route n'a matché (404) [cite: 2447]
app.use(errorHandler); // Gère toutes les erreurs passées via next(error) [cite: 2450]

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});