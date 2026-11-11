
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        ca: fs.readFileSync(path.join(__dirname, "ca.pem")),
        rejectUnauthorized: true
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("BloodBridge MySQL connected successfully!");

        connection.release();

    } catch (error) {
        console.error("MySQL connection failed:", error.message);
        throw error;
    }
}

module.exports = {
    pool,
    testConnection
};
