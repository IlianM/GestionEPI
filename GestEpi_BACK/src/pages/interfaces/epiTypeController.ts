import { Router } from 'express';
import { epiTypeManager } from '../../managers/epiTypeManager'; // Assurez-vous que le chemin est correct

const router = Router();

// Définir les routes pour les opérations CRUD sur les types d'EPI
router.get('/', epiTypeManager.getAllEPITypes); // Obtenir tous les types d'EPI
router.get('/:id', epiTypeManager.getEPITypeById); // Obtenir un type d'EPI par son ID
router.post('/', epiTypeManager.addEPIType); // Ajouter un nouveau type d'EPI
router.put('/:id', epiTypeManager.updateEPIType); // Mettre à jour un type d'EPI existant par son ID
router.delete('/:id', epiTypeManager.deleteEPIType); // Supprimer un type d'EPI par son ID

export { router as epiTypeController }; // Exporter en tant que epiTypeController
