import { Router } from 'express';
import { epiUserManager } from '../../managers/epiUserManager'; // Assurez-vous que le chemin est correct

const router = Router();

// Définition des routes pour les opérations CRUD sur les utilisateurs EPI
router.get('/', epiUserManager.getAllUsers); // Obtenir tous les utilisateurs
router.get('/:id', epiUserManager.getUserById); // Obtenir un utilisateur par son ID
router.post('/', epiUserManager.addUser); // Ajouter un nouvel utilisateur
router.put('/:id', epiUserManager.updateUser); // Mettre à jour un utilisateur existant par son ID
router.delete('/:id', epiUserManager.deleteUser); // Supprimer un utilisateur par son ID

export { router as epiUserController }; // Exporter en tant que epiUserController
