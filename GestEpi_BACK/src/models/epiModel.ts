import { pool } from "./bdd"; // Assuming your database connection pool is set up similarly
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

// Adapt this interface to match the EPI table schema in your database
export interface EPI extends RowDataPacket {
  id: number;
  epiType: string;
  brand: string;
    model: string;
    serialNumber: string;
    innerId: string;
    size: string;
    color: string;
    purchaseDate: Date;
    manufactureDate: Date;
    inServiceDate: Date;
    checkFrequency: number;
    checkFrequencyUnit: string;
  // Add other properties according to your database schema
}

export const epiModel = {
  async getAll(): Promise<EPI[]> {
    const conn = await pool.getConnection();
    try {
      const query = 'SELECT * FROM epi'; // Adapt to your EPI table brand
      const [rows]: [EPI[], FieldPacket[]] = await conn.query(query);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  },

  async getById(id: number): Promise<EPI | null> {
    const conn = await pool.getConnection();
    try {
      const query = 'SELECT * FROM epi WHERE id = ?'; // Adapt to your EPI table and ID field
      const [rows]: [EPI[], FieldPacket[]] = await conn.query(query, [id]);
      return rows[0] || null;
    } finally {
      if (conn) conn.release();
    }
  },

      async addOne(epi: EPI): Promise<number> {
        const conn = await pool.getConnection();
        try {
          const query = 'INSERT INTO epi (brand, model, serialNumber, innerId, epiType, size, color, purchaseDate, manufactureDate, inServiceDate, checkFrequency, checkFrequencyUnit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [epi.brand, epi.model, epi.serialNumber, epi.innerId, epi.epiType, epi.size, epi.color, epi.purchaseDate, epi.manufactureDate, epi.inServiceDate, epi.checkFrequency, epi.checkFrequencyUnit]);
          return result.insertId;
        } finally {
          if (conn) conn.release();
        }
      },



  async update(id: number, epiData: Partial<EPI>): Promise<number> {
    const conn = await pool.getConnection();
    try {
      // Vérifiez quels champs ont été fournis et préparez la partie SET de la requête SQL
      const fieldsToUpdate = Object.keys(epiData).filter(key => epiData[key] !== undefined);
      const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ');
      const values = fieldsToUpdate.map(field => epiData[field]);

      // S'assurer qu'il y a des champs à mettre à jour
      if (!fieldsToUpdate.length) {
        throw new Error("No valid fields provided for update.");
      }

      // Ajouter l'identifiant à la liste des valeurs pour la condition WHERE
      values.push(id);

      // Construire la requête complète
      const query = `UPDATE epi SET ${setClause} WHERE id = ?`;
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, values);
      return result.affectedRows;
    } finally {
      if (conn) conn.release();
    }
  },


  async delete(id: number): Promise<number> {
    const conn = await pool.getConnection();
    try {
      const query = 'DELETE FROM epi WHERE id = ?';
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [id]);
      return result.affectedRows;
    } finally {
      if (conn) conn.release();
    }
  },
};
