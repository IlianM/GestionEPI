import { Router } from 'express';
import { epiManager } from '../../managers/epiManager'; // Assurez-vous que le chemin est correct

const router = Router();

// Remplacer les références et méthodes spécifiques aux avions par celles des EPI
router.get('', epiManager.getAllEPIs);
router.get('/:id', epiManager.getEPIById); // Utiliser 'id' au lieu de 'immatriculation'
router.post('/', epiManager.addEPI);
router.put('/:id', epiManager.updateEPI); // Utiliser 'id' au lieu de 'immatriculation'
router.delete('/:id', epiManager.deleteEPI); // Utiliser 'id' au lieu de 'immatriculation'

export { router as epiController }; // Exporter en tant que epiController
