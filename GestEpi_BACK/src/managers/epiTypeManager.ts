import { Request, Response } from 'express';
import { EPITypeModel } from '../models/epiTypeModel'; // Assurez-vous que le chemin est correct

export const epiTypeManager = {
    async getAllEPITypes(req: Request, res: Response) {
        try {
            const result = await EPITypeModel.getAll();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async getEPITypeById(req: Request, res: Response) {
        try {
            const id = req.params.id; // L'ID est une chaîne de caractères pour EPIType
            if (!id) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const epiType = await EPITypeModel.getById(id);
            epiType ? res.status(200).json(epiType) : res.status(404).json({ message: `AUCUN TYPE D'EPI TROUVE - AVEC L'ID : ${id}` });
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },

    async addEPIType(req: Request, res: Response) {
        try {
            // Assurez-vous que la validation de req.body est effectuée ici ou dans le modèle
            const epiType = await EPITypeModel.addOne(req.body);
            res.status(201).json(epiType);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred while adding the EPI type' });
        }
    },

    async updateEPIType(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await EPITypeModel.update(id, req.body);
            if (affectedRows > 0) {
                const updatedEPIType = await EPITypeModel.getById(id);
                res.status(200).json(updatedEPIType);
            } else {
                res.status(404).json({ message: "AUCUN TYPE D'EPI MODIFIE - Peut-être que l'ID n'existe pas." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while updating the EPI type' });
        }
    },

    async deleteEPIType(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const affectedRows = await EPITypeModel.delete(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: `TYPE D'EPI avec l'ID ${id} supprimé.` });
            } else {
                res.status(404).json({ message: "AUCUN TYPE D'EPI SUPPRIME - Le type d'EPI correspondant à l’ID spécifiée n’a pas été supprimé." });
            }
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while deleting the EPI type' });
        }
    },
};