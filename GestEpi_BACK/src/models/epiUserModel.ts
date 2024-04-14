import { pool } from "./bdd"; // Assuming your database connection pool is set up similarly
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

export interface EpiUser extends RowDataPacket {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    mail: string;
    userType: number;
}

export const epiUserModel = {
    async getAll(): Promise<EpiUser[]> {
        const conn = await pool.getConnection();
        try {
            const query = 'SELECT * FROM epiUser'; // Adapt to your EpiUser table name
            const [rows]: [EpiUser[], FieldPacket[]] = await conn.query(query);
            return rows;
        } finally {
            if (conn) conn.release();
        }
    },

    async getById(id: number): Promise<EpiUser | null> {
        const conn = await pool.getConnection();
        try {
            const query = 'SELECT * FROM epiUser WHERE id = ?'; // Adapt to your EpiUser table and ID field
            const [rows]: [EpiUser[], FieldPacket[]] = await conn.query(query, [id]);
            return rows[0] || null;
        } finally {
            if (conn) conn.release();
        }
    },

    async addOne(user: EpiUser): Promise<void> {
        const conn = await pool.getConnection();
        try {
            const query = 'INSERT INTO epiUser (firstName, lastName, phone, mail, userType) VALUES (?, ?, ?, ?, ?)';
            await conn.query(query, [user.firstName, user.lastName, user.phone, user.mail, user.userType]);
        } finally {
            if (conn) conn.release();
        }
    },

    async update(id: number, userData: Partial<EpiUser>): Promise<number> {
        const conn = await pool.getConnection();
        try {
            const query = 'UPDATE epiUser SET firstName = ?, lastName = ?, phone = ?, mail = ?, userType = ? WHERE id = ?';
            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [
                userData.firstName, userData.lastName, userData.phone, userData.mail, userData.userType, id
            ]);
            return result.affectedRows;
        } finally {
            if (conn) conn.release();
        }
    },

    async delete(id: number): Promise<number> {
        const conn = await pool.getConnection();
        try {
            const query = 'DELETE FROM epiUser WHERE id = ?';
            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [id]);
            return result.affectedRows;
        } finally {
            if (conn) conn.release();
        }
    },
};
