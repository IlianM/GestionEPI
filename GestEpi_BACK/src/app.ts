import express from 'express';
import cors from 'cors';
import { epiController } from './pages/interfaces/epiController';
import * as middlewares from './pages/interfaces/middlewares';
import { epiCheckController } from "./pages/interfaces/epiCheckController";
import { epiTypeController } from "./pages/interfaces/epiTypeController";
import { checkStatusController } from "./pages/interfaces/checkStatusController";
import { epiUserController } from "./pages/interfaces/epiUserController";
import { userTypeController } from "./pages/interfaces/userTypeController";

require('dotenv').config();

// Mise à jour de la configuration CORS pour inclure l'URL de l'application Angular
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:4200',
    'http://localhost:5501'
    // Ajout de l'URL du frontend Angular
];


const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Spécification des méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'],  // Spécification des en-têtes autorisés
    credentials: true  // Si nécessaire, pour les requêtes avec authentification
};

const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Express !');
});

// Activation de CORS avec les options configurées
app.use(cors(options));

// Middleware pour analyser le JSON dans les requêtes entrantes
app.use(express.json());

// Définition des routes pour différentes fonctionnalités
app.use('/epi', epiController);
app.use('/epiCheck', epiCheckController);
app.use('/epiType', epiTypeController);
app.use('/checkStatus', checkStatusController);
app.use('/epiUser', epiUserController);
app.use('/userType', userTypeController);

// Middlewares pour les routes non trouvées et la gestion des erreurs
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
