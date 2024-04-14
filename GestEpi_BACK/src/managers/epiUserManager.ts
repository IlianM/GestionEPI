import { Request, Response } from 'express';
import { epiUserModel } from '../models/epiUserModel'; // Assurez-vous que le chemin est correct

export const epiUserManager = {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await epiUserModel.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const user = await epiUserModel.getById(id);
            user ? res.status(200).json(user) : res.status(404).json({ message: `AUCUN UTILISATEUR TROUVÉ - AVEC L'ID : ${id}` });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async addUser(req: Request, res: Response) {
        try {
            const newUser = await epiUserModel.addOne(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred while adding the user' });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await epiUserModel.update(id, req.body);
            if (affectedRows > 0) {
                const updatedUser = await epiUserModel.getById(id);
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "AUCUN UTILISATEUR MODIFIÉ - Peut-être que l'ID n'existe pas." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while updating the user' });
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await epiUserModel.delete(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: `UTILISATEUR avec l'ID ${id} supprimé.` });
            } else {
                res.status(404).json({ message: "AUCUN UTILISATEUR SUPPRIMÉ - L'utilisateur correspondant à l’ID spécifiée n’a pas été supprimé." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while deleting the user' });
        }
    },
};
