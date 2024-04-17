import { pool } from "./bdd";
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export interface EPICheck extends RowDataPacket {
  id: number;
  epiId: number;
  epiBrandModel: string; // Nouveau champ pour la marque et le modèle
  checkDate: string;
  checkStatusId: number; // Utilisez checkStatusId pour stocker l'ID du statut
  checkStatusLabel: string; // Le label du statut
  userId: number;
  userName: string; // Nom complet de l'utilisateur
  checkComment: string;
}

export const epiCheckModel = {
  async getAll(): Promise<EPICheck[]> {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT epiCheck.*, checkStatus.label as checkStatusLabel, CONCAT(epiUser.firstName, ' ', epiUser.lastName) as userName,
               CONCAT(epi.brand, ' ', epi.model) as epiBrandModel
        FROM epiCheck
        JOIN checkStatus ON epiCheck.checkStatus = checkStatus.id
        JOIN epiUser ON epiCheck.userId = epiUser.id
        JOIN epi ON epiCheck.epiId = epi.id;
      `;
      const [rows]: [EPICheck[], FieldPacket[]] = await conn.query(query);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  },

  async getById(id: number): Promise<EPICheck | null> {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT epiCheck.*, checkStatus.label as checkStatusLabel, CONCAT(epiUser.firstName, ' ', epiUser.lastName) as userName,
               CONCAT(epi.brand, ' ', epi.model) as epiBrandModel
        FROM epiCheck
        JOIN checkStatus ON epiCheck.checkStatus = checkStatus.id
        JOIN epiUser ON epiCheck.userId = epiUser.id
        JOIN epi ON epiCheck.epiId = epi.id
        WHERE epiCheck.id = ?;
      `;
      const [rows]: [EPICheck[], FieldPacket[]] = await conn.query(query, [id]);
      return rows[0] || null;
    } finally {
      if (conn) conn.release();
    }
  },

  async addOne(epiCheck: EPICheck): Promise<void> {
    const conn = await pool.getConnection();
    try {
      const query = 'INSERT INTO epiCheck (epiId, checkDate, checkStatus, userId, checkComment) VALUES (?, ?, ?, ?, ?)';
      await conn.query(query, [epiCheck.epiId, epiCheck.checkDate, epiCheck.checkStatus, epiCheck.userId, epiCheck.checkComment]);
    } finally {
      if (conn) conn.release();
    }
  },

  async update(id: number, epiCheckData: Partial<EPICheck>): Promise<number> {
    const conn = await pool.getConnection();
    try {
      const query = 'UPDATE epiCheck SET epiId = ?, checkDate = ?, checkStatus = ?, userId = ?, checkComment = ? WHERE id = ?';
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [
        epiCheckData.epiId, epiCheckData.checkDate, epiCheckData.checkStatus, epiCheckData.userId, epiCheckData.checkComment, id
      ]);
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
