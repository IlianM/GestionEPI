import { Request, Response } from 'express';
import { epiModel } from '../models/epiModel'; // Vérifiez que le chemin est correct

export const epiManager = {
  async getAllEPIs(req: Request, res: Response) {
    try {
      const result = await epiModel.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },

  async getEPIById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const epi = await epiModel.getById(id);
      epi ? res.status(200).json(epi) : res.status(404).json({ message: `AUCUN EPI TROUVE - AVEC L'ID : ${id}` });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },

  async addEPI(req: Request, res: Response) {
    try {
      const insertId = await epiModel.addOne(req.body);
      if (insertId) {
        const epi = await epiModel.getById(insertId);
        res.status(201).json(epi);
      } else {
        res.status(400).json({ message: 'Failed to add EPI.' });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred while adding the EPI' });
    }
  },


  async updateEPI(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const affectedRows = await epiModel.update(id, req.body);
      if (affectedRows > 0) {
        const updatedEPI = await epiModel.getById(id);
        res.status(200).json(updatedEPI);
      } else {
        res.status(404).json({ message: "AUCUN EPI MODIFIE - Peut-être que l'ID n'existe pas." });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while updating the EPI' });
    }
  },

  async deleteEPI(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const affectedRows = await epiModel.delete(id);
      if (affectedRows > 0) {
        res.status(200).json({ message: `EPI avec l'ID ${id} supprimé.` });
      } else {
        res.status(404).json({ message: "AUCUN EPI SUPPRIME - L'EPI correspondant à l’ID spécifiée n’a pas été supprimé." });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while deleting the EPI' });
    }
  },
};
