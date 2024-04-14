import { Router } from 'express';
import { checkStatusManager } from '../../managers/checkStatusManager'; // Assurez-vous que le chemin est correct

const router = Router();

// Définition des routes pour les opérations CRUD sur les statuts de vérification
router.get('/', checkStatusManager.getAllCheckStatuses); // Obtenir tous les statuts
router.get('/:id', checkStatusManager.getCheckStatusById); // Obtenir un statut par son ID
router.post('/', checkStatusManager.addCheckStatus); // Ajouter un nouveau statut
router.put('/:id', checkStatusManager.updateCheckStatus); // Mettre à jour un statut existant par son ID
router.delete('/:id', checkStatusManager.deleteCheckStatus); // Supprimer un statut par son ID

export { router as checkStatusController }; // Exporter en tant que checkStatusController
