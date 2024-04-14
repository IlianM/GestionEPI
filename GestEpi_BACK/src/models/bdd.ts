import mysql from 'mysql2/promise';

// Création d'une connexion à la base de données MySQL
const pool = mysql.createPool({
    host: 'mysql-maciubailian.alwaysdata.net',
    queueLimit: 5,
    user: '354040_maciuba',
    password: 'ImaaMac95!Cergy',
    database: 'maciubailian_gestionepi',
});
// Fonction pour tester la connexion
const testConn = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connexion réussie à la base de données MySQL.");
        connection.release();
    } catch (err) {
        console.error("Impossible de se connecter à la base de données MySQL:", err);
    }
};

export { pool };
