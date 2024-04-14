import { Request, Response } from 'express';
import { userTypeModel } from '../models/userTypeModel'; // Assurez-vous que le chemin est correct

export const userTypeManager = {
    async getAllUserTypes(req: Request, res: Response) {
        try {
            const userTypes = await userTypeModel.getAll();
            res.status(200).json(userTypes);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async getUserTypeById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const userType = await userTypeModel.getById(id);
            userType ? res.status(200).json(userType) : res.status(404).json({ message: `AUCUN TYPE D'UTILISATEUR TROUVÉ - AVEC L'ID : ${id}` });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async addUserType(req: Request, res: Response) {
        try {
            const newUserType = await userTypeModel.addOne(req.body);
            res.status(201).json(newUserType);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred while adding the user type' });
        }
    },

    async updateUserType(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await userTypeModel.update(id, req.body);
            if (affectedRows > 0) {
                const updatedUserType = await userTypeModel.getById(id);
                res.status(200).json(updatedUserType);
            } else {
                res.status(404).json({ message: "AUCUN TYPE D'UTILISATEUR MODIFIÉ - Peut-être que l'ID n'existe pas." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while updating the user type' });
        }
    },

    async deleteUserType(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await userTypeModel.delete(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: `TYPE D'UTILISATEUR avec l'ID ${id} supprimé.` });
            } else {
                res.status(404).json({ message: "AUCUN TYPE D'UTILISATEUR SUPPRIMÉ - Le type d'utilisateur correspondant à l’ID spécifiée n’a pas été supprimé." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while deleting the user type' });
        }
    },
};
