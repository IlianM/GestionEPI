import { Router } from 'express';
import { epiCheckManager } from '../../managers/epiCheckManager';

const router = Router();

// Remplacer les références et méthodes spécifiques aux avions par celles des EPI
router.get('', epiCheckManager.getAllEPIChecks);
router.get('/:id', epiCheckManager.getEPICheckById); // Utiliser 'id' au lieu de 'immatriculation'
router.post('/', epiCheckManager.addEPICheck);
router.put('/:id', epiCheckManager.updateEPICheck); // Utiliser 'id' au lieu de 'immatriculation'
router.delete('/:id', epiCheckManager.deleteEPICheck); // Utiliser 'id' au lieu de 'immatriculation'

export { router as epiCheckController }; // Exporter en tant que epiController
