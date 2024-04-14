import { pool } from "./bdd"; // Assuming your database connection pool is set up similarly
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

// Adapt this interface to match the CheckStatus table schema in your database
export interface CheckStatus extends RowDataPacket {
    id: number;
    label: string;
}

export const checkStatusModel = {
    async getAll(): Promise<CheckStatus[]> {
        const conn = await pool.getConnection();
        try {
            const query = 'SELECT * FROM checkStatus'; // Adapt to your CheckStatus table name
            const [rows]: [CheckStatus[], FieldPacket[]] = await conn.query(query);
            return rows;
        } finally {
            if (conn) conn.release();
        }
    },

    async getById(id: number): Promise<CheckStatus | null> {
        const conn = await pool.getConnection();
        try {
            const query = 'SELECT * FROM checkStatus WHERE id = ?'; // Adapt to your CheckStatus table and ID field
            const [rows]: [CheckStatus[], FieldPacket[]] = await conn.query(query, [id]);
            return rows[0] || null;
        } finally {
            if (conn) conn.release();
        }
    },

    async addOne(checkStatus: CheckStatus): Promise<void> {
        const conn = await pool.getConnection();
        try {
            const query = 'INSERT INTO checkStatus (label) VALUES (?)'; // Adapt fields to your CheckStatus table
            await conn.query(query, [checkStatus.label]);
        } finally {
            if (conn) conn.release();
        }
    },

    async update(id: number, checkStatusData: Partial<CheckStatus>): Promise<number> {
        const conn = await pool.getConnection();
        try {
            // Construct your UPDATE query based on which fields of CheckStatus can be updated
            const query = 'UPDATE checkStatus SET label = ? WHERE id = ?';
            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [checkStatusData.label, id]);
            return result.affectedRows;
        } finally {
            if (conn) conn.release();
        }
    },

    async delete(id: number): Promise<number> {
        const conn = await pool.getConnection();
        try {
            const query = 'DELETE FROM checkStatus WHERE id = ?';
            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [id]);
            return result.affectedRows;
        } finally {
            if (conn) conn.release();
        }
    },
};
