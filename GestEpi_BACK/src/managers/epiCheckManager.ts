import { Request, Response } from 'express';
import { epiCheckModel } from '../models/epiCheckModel'; // Assurez-vous que le chemin est correct

export const epiCheckManager = {
  async getAllEPIChecks(req: Request, res: Response) {
    try {
      const result = await epiCheckModel.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },

  async getEPICheckById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const epiCheck = await epiCheckModel.getById(id);
      epiCheck ? res.status(200).json(epiCheck) : res.status(404).json({ message: `AUCUN CHECK TROUVE - AVEC L'ID : ${id}` });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },

  async addEPICheck(req: Request, res: Response) {
    try {
      const epiCheck = await epiCheckModel.addOne(req.body);
      res.status(201).json(epiCheck);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred while adding the EPICheck' });
    }
  },

  async updateEPICheck(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const affectedRows = await epiCheckModel.update(id, req.body);
      if (affectedRows > 0) {
        const updatedEPICheck = await epiCheckModel.getById(id);
        res.status(200).json(updatedEPICheck);
      } else {
        res.status(404).json({ message: "AUCUN CHECK MODIFIE - Peut-être que l'ID n'existe pas." });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while updating the EPICheck' });
    }
  },

  async deleteEPICheck(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const affectedRows = await epiCheckModel.delete(id);
      if (affectedRows > 0) {
        res.status(200).json({ message: `CHECK avec l'ID ${id} supprimé.` });
      } else {
        res.status(404).json({ message: "AUCUN CHECK SUPPRIME - Le CHECK correspondant à l'ID spécifiée n'a pas été supprimé." });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred while deleting the EPICheck' });
    }
  },
};
