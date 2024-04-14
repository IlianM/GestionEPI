import { Router } from 'express';
import { userTypeManager } from '../../managers/userTypeManager'; // Assurez-vous que le chemin est correct

const router = Router();

// Définition des routes pour les opérations CRUD sur les types d'utilisateur
router.get('/', userTypeManager.getAllUserTypes); // Obtenir tous les types d'utilisateur
router.get('/:id', userTypeManager.getUserTypeById); // Obtenir un type d'utilisateur par son ID
router.post('/', userTypeManager.addUserType); // Ajouter un nouveau type d'utilisateur
router.put('/:id', userTypeManager.updateUserType); // Mettre à jour un type d'utilisateur existant par son ID
router.delete('/:id', userTypeManager.deleteUserType); // Supprimer un type d'utilisateur par son ID

export { router as userTypeController }; // Exporter en tant que userTypeController
