import express from 'express';
import cors from 'cors';
// Importez epiController au lieu de avionController
import { epiController } from './pages/interfaces/epiController';
import * as middlewares from './pages/interfaces/middlewares';
import {epiCheckController} from "./pages/interfaces/epiCheckController";
import {epiTypeController} from "./pages/interfaces/epiTypeController";
import {checkStatusController} from "./pages/interfaces/checkStatusController";
import {epiUserController} from "./pages/interfaces/epiUserController";
import {userTypeController} from "./pages/interfaces/userTypeController";

require('dotenv').config();

// Configuration CORS
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const options: cors.CorsOptions = { origin: allowedOrigins };

const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Express !');
});

// Activer CORS avec les options configurées
app.use(cors(options));

// Middleware pour analyser le JSON dans les requêtes entrantes
app.use(express.json());

// Utiliser epiController pour toutes les routes préfixées par '/epis'
// epiController s'occupera des routes spécifiques comme '/', '/:id', etc.
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
