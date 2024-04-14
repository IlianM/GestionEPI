import { pool } from "./bdd"; // Assuming your database connection pool is set up similarly
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

// Adapt this interface to match the UserType table schema in your database
export interface UserType extends RowDataPacket {
    id: number;
    label: string;
}

export const userTypeModel = {
    async getAll(): Promise<UserType[]> {
        const conn = await pool.getConnection();
        try {
            const query = 'SELECT * FROM userType'; // Adapt to your UserType table name
            const [rows]: [UserType[], FieldPacket[]] = await conn.query(query);
            return rows;
        } finally {
            if (conn) conn.release();
        }
    },

    async getById(id: number): Promise<UserType | null> {
        const conn = await pool.getConnection();
        try {
            const query = 'SELECT * FROM userType WHERE id = ?'; // Adapt to your UserType table and ID field
            const [rows]: [UserType[], FieldPacket[]] = await conn.query(query, [id]);
            return rows[0] || null;
        } finally {
            if (conn) conn.release();
        }
    },

    async addOne(userType: UserType): Promise<void> {
        const conn = await pool.getConnection();
        try {
            const query = 'INSERT INTO userType (label) VALUES (?)'; // Adapt fields to your UserType table
            await conn.query(query, [userType.label]);
        } finally {
            if (conn) conn.release();
        }
    },

    async update(id: number, userTypeData: Partial<UserType>): Promise<number> {
        const conn = await pool.getConnection();
        try {
            // Construct your UPDATE query based on which fields of UserType can be updated
            const query = 'UPDATE userType SET label = ? WHERE id = ?';
            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [userTypeData.label, id]);
            return result.affectedRows;
        } finally {
            if (conn) conn.release();
        }
    },

    async delete(id: number): Promise<number> {
        const conn = await pool.getConnection();
        try {
            const query = 'DELETE FROM userType WHERE id = ?';
            const [result]: [ResultSetHeader, FieldPacket[]] = await conn.query(query, [id]);
            return result.affectedRows;
        } finally {
            if (conn) conn.release();
        }
    },
};
