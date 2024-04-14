import { pool } from "./bdd"; // En supposant que votre pool de connexion à la base de données est configuré de manière similaire
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

// Adaptez cette interface pour correspondre au schéma de la table EPIType dans votre base de données
export interface EPIType extends RowDataPacket {
  id: string;
  label: string;
  // Ajoutez d'autres propriétés selon votre schéma de base de données
}

export const EPITypeModel = {
  async getAll(): Promise<EPIType[]> {
    const conn = await pool.getConnection();
    try {
      const query = 'SELECT * FROM epiType'; // Adaptez au nom de votre table EPIType
      const [rows]: [EPIType[], FieldPacket[]] = await conn.query(query);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  },

  async getById(id: string): Promise<EPIType | null> {
    const conn = await pool.getConnection();
    try {
      const query = 'SELECT * FROM epi_type WHERE id = ?'; // Adaptez au nom de votre table et au champ ID
      const [rows]: [EPIType[], FieldPacket[]] = await conn.query(query, [id]);
      return rows[0] || null;
    } finally {
      if (conn) conn.release();
    }
  },

  async addOne(epiType: EPIType): Promise<void> {
    const conn = await pool.getConnection();
    try {
      const query = 'INSERT INTO epi_type (id, label) VALUES (?, ?)'; // Adaptez les champs à votre table EPIType
      await conn.query(query, [epiType.id, epiType.label]); // Ajoutez d'autres champs si nécessaire
    } finally {
      if (conn) conn.release();
    }
  },

  async update(id: string, epiTypeData: Partial<EPIType>): Promise<number> {
    const conn = await pool.getConnection();
    try {
      // Construisez votre requête UPDATE en fonction des champs de EPIType qui peuvent être mis à jour
      const query = 'UPDATE epi_type SET label = ? WHERE id = ?';
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [epiTypeData.label, id]);
      return result.affectedRows;
    } finally {
      if (conn) conn.release();
    }
  },

  async delete(id: string): Promise<number> {
    const conn = await pool.getConnection();
    try {
      const query = 'DELETE FROM epi_type WHERE id = ?';
      const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [id]);
      return result.affectedRows;
    } finally {
      if (conn) conn.release();
    }
  },
};
