import { pool } from "./bdd"; // Assumons que votre pool de connexion à la base de données est configuré de manière similaire
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

// Adaptez cette interface pour correspondre au schéma de la table EPICheck dans votre base de données
export interface EPICheck extends RowDataPacket {
  id: number;
  epiId: number;
  checkDate: string;
  checkStatus: string; // Adaptez selon le type utilisé dans votre base de données pour CheckStatus
  userId: number;
  checkComment: string;
  // Ajoutez d'autres propriétés selon votre schéma de base de données
}

export const epiCheckModel = {
  async getAll(): Promise<EPICheck[]> {
    const conn = await pool.getConnection();
    try {
      const query = 'SELECT * FROM epiCheck'; // Adaptez au nom de votre table EPICheck
      const [rows]: [EPICheck[], FieldPacket[]] = await conn.query(query);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  },

  async getById(id: number): Promise<EPICheck | null> {
    const conn = await pool.getConnection();
    try {
      const query = 'SELECT * FROM epiCheck WHERE id = ?'; // Adaptez au nom de votre table et au champ ID
      const [rows]: [EPICheck[], FieldPacket[]] = await conn.query(query, [id]);
      return rows[0] || null;
    } finally {
      if (conn) conn.release();
    }
  },

  async addOne(epiCheck: EPICheck): Promise<void> {
    const conn = await pool.getConnection();
    try {
      const query = 'INSERT INTO epiCheck (epiId, checkDate, checkStatus, userId, checkComment) VALUES (?, ?, ?, ?, ?)'; // Adaptez les champs à votre table
      await conn.query(query, [epiCheck.epiId, epiCheck.checkDate, epiCheck.checkStatus, epiCheck.userId, epiCheck.checkComment]); // Ajoutez d'autres champs si nécessaire
    } finally {
      if (conn) conn.release();
    }
  },

  async update(id: number, epiCheckData: Partial<EPICheck>): Promise<number> {
    const conn = await pool.getConnection();
    try {
      // Construisez votre requête UPDATE en fonction des champs de EPICheck qui peuvent être mis à jour
      // Cet exemple met à jour 'checkDate', 'checkStatus', 'userId', et 'comment'; ajoutez d'autres champs au besoin
      const query = 'UPDATE epiCheck SET checkDate = ?, checkStatus = ?, userId = ?, checkComment = ? WHERE id = ?';
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [epiCheckData.checkDate, epiCheckData.checkStatus, epiCheckData.userId, epiCheckData.checkComment, id]);
      return result.affectedRows;
    } finally {
      if (conn) conn.release();
    }
  },

  async delete(id: number): Promise<number> {
    const conn = await pool.getConnection();
    try {
      const query = 'DELETE FROM epiCheck WHERE id = ?';
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [id]);
      return result.affectedRows;
    } finally {
      if (conn) conn.release();
    }
  },
};
