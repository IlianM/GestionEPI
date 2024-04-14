import { Request, Response } from 'express';
import { checkStatusModel } from '../models/checkStatusModel'; // Vérifiez que le chemin est correct

export const checkStatusManager = {
    async getAllCheckStatuses(req: Request, res: Response) {
        try {
            const result = await checkStatusModel.getAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async getCheckStatusById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const checkStatus = await checkStatusModel.getById(id);
            checkStatus ? res.status(200).json(checkStatus) : res.status(404).json({ message: `AUCUN STATUT TROUVÉ - AVEC L'ID : ${id}` });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async addCheckStatus(req: Request, res: Response) {
        try {
            const status = await checkStatusModel.addOne(req.body);
            res.status(201).json(status);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred while adding the check status' });
        }
    },

    async updateCheckStatus(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await checkStatusModel.update(id, req.body);
            if (affectedRows > 0) {
                const updatedStatus = await checkStatusModel.getById(id);
                res.status(200).json(updatedStatus);
            } else {
                res.status(404).json({ message: "AUCUN STATUT MODIFIÉ - Peut-être que l'ID n'existe pas." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while updating the check status' });
        }
    },

    async deleteCheckStatus(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await checkStatusModel.delete(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: `STATUT avec l'ID ${id} supprimé.` });
            } else {
                res.status(404).json({ message: "AUCUN STATUT SUPPRIMÉ - Le statut correspondant à l’ID spécifiée n’a pas été supprimé." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while deleting the check status' });
        }
    },
};
